import { PlainTodo, InputTodo } from '@todo/todo.type';
import { Todo } from '@todo/todo';
import { isEqualDate, DAY } from '@todo/todo.util';
import { compareFunctions } from '@todo/todoList.util';
import { ITodoListDataBase } from '@todo/todoList.interface';
export class TodoList {
  private readonly todoList: Todo[];
  private readonly db: ITodoListDataBase;
  constructor(todoList: InputTodo[], db: ITodoListDataBase) {
    this.todoList = todoList.map((el) => new Todo(el));
    this.db = db;
  }

  private getActiveTodoAsInstance(): Todo {
    return this.todoList.filter((el) => el.state === 'READY').sort(Todo.compare())[0];
  }

  private getActiveTodoId(): string {
    return this.getActiveTodoAsInstance().id;
  }

  async getActiveTodo(): Promise<PlainTodo> {
    return this.getActiveTodoAsInstance()?.toPlain();
  }

  async getSortedRTL(today?: Date): Promise<PlainTodo[]> {
    return this.todoList
      .filter((el) => el.state === 'READY')
      .sort(Todo.compare(today))
      .map((el) => el.toPlain());
  }

  async postponeTemporally(): Promise<TodoList> {
    this.getActiveTodoAsInstance().postponeTemporally();
    return new TodoList(this.todoList.map((el) => el.toPlain()));
  }

  async postponeDeadline(): Promise<TodoList> {
    this.getActiveTodoAsInstance().postponeDeadline();
    return new TodoList(this.todoList.map((el) => el.toPlain()));
  }

  async postponeForToday(): Promise<TodoList> {
    this.getActiveTodoAsInstance().postponeForToday().setWait();
    return new TodoList(this.todoList.map((el) => el.toPlain()));
  }

  async lowerImportance(): Promise<TodoList> {
    this.getActiveTodoAsInstance().lowerImportance();
    return new TodoList(this.todoList.map((el) => el.toPlain()));
  }

  async setDone(): Promise<TodoList> {
    const activeTodo = this.getActiveTodoAsInstance();
    activeTodo.setDone();
    this.getNext(activeTodo).forEach((el) => this.updateTodoState(el));

    return new TodoList(this.todoList.map((el) => el.toPlain()));
  }

  async updateElapsedTime(elapsedTime: number): Promise<TodoList> {
    this.getActiveTodoAsInstance().updateElapsedTime(elapsedTime);
    return new TodoList(this.todoList.map((el) => el.toPlain()));
  }

  getSummary(): any {
    return {
      numberOfImminenceTodos: this.todoList
        .filter((el) => el.state === 'READY')
        .filter((el) => isEqualDate(el.until, new Date())).length,
      numberOfDistantTodos: this.todoList
        .filter((el) => el.state === 'READY')
        .filter((el) => !isEqualDate(el.until, new Date())).length,
      numberOfReadyStateTodos: this.todoList.filter((el) => el.state === 'READY').length,
      numberOfWaitStateTodos: this.todoList.filter((el) => el.state === 'WAIT').length,
      numberOfTotalTodos: this.todoList.length,
      numberOfRemainingTodos: -1,
      numberOfPostpones: -1,
      TotalElapsedTime: -1,
      numberOfTodayDoneTodos: -1,
    };
  }

  private checkPrev(todo: Todo): boolean {
    return [...todo.prev].every((prevId) => this.todoList.find((el) => el.id === prevId)?.state === 'DONE');
  }

  private checkFrom(todo: Todo, date?: Date): boolean {
    const today = date ?? new Date();
    return todo.from < today;
  }

  private updateTodoState(todo: Todo, date?: Date): Todo {
    if (todo.state === 'DONE') return todo;
    if (this.checkFrom(todo, date) && this.checkPrev(todo)) todo.state = 'READY';
    else todo.state = 'WAIT';
    return todo;
  }

  async updateAll(date?: Date): Promise<TodoList> {
    this.todoList.forEach((el) => this.updateTodoState(el, date));
    return new TodoList(this.todoList.map((el) => el.toPlain()));
  }

  getTL(): PlainTodo[] {
    return this.todoList.map((el) => el.toPlain());
  }

  private getPrev(todo: Todo): Todo[] {
    return [...todo.prev]
      .map((prevId) => this.todoList.find((el) => el.id === prevId))
      .filter((el) => el !== undefined) as Todo[];
  }

  private getNext(todo: Todo): Todo[] {
    return [...todo.next]
      .map((nextId) => this.todoList.find((el) => el.id === nextId))
      .filter((el) => el !== undefined) as Todo[];
  }

  async add(todo: InputTodo): Promise<TodoList> {
    const newTodo = new Todo(todo);

    this.getPrev(newTodo).forEach((el) => el.addNext(newTodo.id));

    this.updateTodoState(newTodo);

    this.getNext(newTodo).forEach((el) => el.addPrev(newTodo.id));

    this.getNext(newTodo).forEach((el) => this.updateTodoState(el));

    this.todoList.push(newTodo);

    return new TodoList(this.todoList.map((el) => el.toPlain()));
  }

  async edit(id: string, todo: InputTodo): Promise<TodoList> {
    const oldTodo = this.todoList.find((el) => el.id === id);
    if (oldTodo === undefined) throw new Error('ERROR: 수정하려는 ID의 Todo가 존재하지 않습니다.');
    const newTodo = new Todo(todo);

    this.getPrev(oldTodo).forEach((el) => el.removeNext(oldTodo.id));
    this.getPrev(newTodo).forEach((el) => el.addNext(newTodo.id));

    this.updateTodoState(newTodo);

    this.getNext(oldTodo).forEach((el) => el.removePrev(oldTodo.id));
    this.getNext(newTodo).forEach((el) => el.addPrev(newTodo.id));

    this.getNext(oldTodo).forEach((el) => this.updateTodoState(el));
    this.getNext(newTodo).forEach((el) => this.updateTodoState(el));

    const newTodoList = this.todoList.filter((el) => el !== oldTodo);
    newTodoList.push(newTodo);

    return new TodoList(newTodoList.map((el) => el.toPlain()));
  }

  async remove(id: string): Promise<TodoList> {
    const newTodo = this.todoList.find((el) => el.id === id);
    if (newTodo === undefined) throw new Error('ERROR: 지우려는 ID의 Todo가 존재하지 않습니다.');

    this.getPrev(newTodo).forEach((el) => el.removeNext(newTodo.id));

    this.getNext(newTodo).forEach((el) => el.removePrev(newTodo.id));

    this.getNext(newTodo).forEach((el) => this.updateTodoState(el));

    return new TodoList(this.todoList.filter((el) => el.id !== id).map((el) => el.toPlain()));
  }

  async getSortedList(type: 'READY' | 'WAIT' | 'DONE', compareArr: string[]): Promise<PlainTodo[]> {
    const generateCompare = (compareArr: string[]) => {
      return (a: Todo, b: Todo): number => {
        let result = 0;
        for (let i = 0; i < compareArr.length; i++) {
          result = compareFunctions[compareArr[i] as keyof typeof compareFunctions](a, b);
          if (result !== 0) break;
        }
        return result;
      };
    };
    const newTodoList = this.todoList.filter((el) => el.state === type).sort(generateCompare(compareArr));
    return newTodoList.map((el) => el.toPlain());
  }

  async getTodoById(id: string): Promise<PlainTodo | undefined> {
    return this.todoList.find((el) => el.id === id)?.toPlain();
  }
}
