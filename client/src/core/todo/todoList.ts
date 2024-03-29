import { PlainTodo, InputTodo } from '@todo/todo.type';
import { Todo } from '@todo/todo';
import { isEqualDate, DAY } from '@todo/todo.util';
import { generateCompare, defaultCompare, getDefaultCompareForSpecificDate } from '@todo/todoList.util';
import { ITodoListDataBase } from '@repository/repository.interface';
import { MemoryDB } from '@repository/repository.memoryDB';
import { IndexedDBFactory } from '@repository/repository.indexedDB';
import { SortCommand } from '@todo/todoList.type';

export const createTodoList = async (dbType: 'MemoryDB' | 'IndexedDB', todos?: InputTodo[]): Promise<TodoList> => {
  if (dbType === 'MemoryDB') {
    const mdb = new MemoryDB(todos);
    const todoList = new TodoList(mdb);
    return await todoList.init();
  }
  if (dbType === 'IndexedDB') {
    const idbFactory = new IndexedDBFactory();
    const idb = await idbFactory.createDB(todos);
    const todoList = new TodoList(idb);
    return await todoList.init();
  }
  throw new Error('ERROR: invalid DB type for TodoList');
};

export class TodoList {
  private readonly db: ITodoListDataBase;
  private readonly todoList: Todo[];
  constructor(db: ITodoListDataBase, todoList?: InputTodo[]) {
    this.db = db;
    this.todoList = todoList?.map((el) => new Todo(el)) ?? [];
  }

  async init(): Promise<TodoList> {
    const newTodoList = await this.db.getAll();
    return new TodoList(this.db, newTodoList);
  }

  private getActiveTodoAsInstance(): Todo {
    return this.todoList.filter((el) => el.state === 'READY').sort(defaultCompare)[0];
  }

  private getActiveTodoId(): string {
    return this.getActiveTodoAsInstance().id;
  }

  async getActiveTodo(): Promise<PlainTodo> {
    return this.getActiveTodoAsInstance()?.toPlain();
  }

  async getSortedRTL(today?: Date): Promise<PlainTodo[]> {
    return await this.getSortedList('READY', [], today);
  }

  async postponeTemporally(): Promise<TodoList> {
    const activeTodo = this.getActiveTodoAsInstance();
    const newTodoList = await this.db.edit(activeTodo.id, { lastPostponed: new Date() });
    return new TodoList(this.db, newTodoList);
  }

  async postponeDeadline(): Promise<TodoList> {
    const activeTodo = this.getActiveTodoAsInstance();
    const newTodoList = await this.db.edit(activeTodo.id, { until: new Date(activeTodo.until.getTime() + DAY) });
    return new TodoList(this.db, newTodoList);
  }

  async postponeForToday(): Promise<TodoList> {
    const activeTodo = this.getActiveTodoAsInstance();
    const today = new Date();
    const newTodoList = await this.db.edit(activeTodo.id, {
      from: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      state: 'WAIT',
    });
    return new TodoList(this.db, newTodoList);
  }

  async lowerImportance(): Promise<TodoList> {
    const activeTodo = this.getActiveTodoAsInstance();
    if (activeTodo.importance === 1) throw new Error('ERROR: 중요도를 낮추려는 Todo의 중요도가 이미 최하위입니다.');
    const newTodoList = await this.db.edit(activeTodo.id, {
      importance: Math.max(1, activeTodo.importance - 1),
    });
    return new TodoList(this.db, newTodoList);
  }

  async updateElapsedTime(elapsedTime: number): Promise<TodoList> {
    const activeTodo = this.getActiveTodoAsInstance();
    const newTodoList = await this.db.edit(activeTodo.id, { elapsedTime });
    return new TodoList(this.db, newTodoList);
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

  async setDone(): Promise<TodoList> {
    const activeTodo = this.getActiveTodoAsInstance();
    const changedTodoSet = new Set<Todo>();

    changedTodoSet.add(activeTodo.setDone());

    this.getNext(activeTodo).forEach((el) => {
      changedTodoSet.add(this.updateTodoState(el));
    });

    const newTodoList = await this.db.editMany([...changedTodoSet].map((el) => ({ id: el.id, todo: el.toPlain() })));
    return new TodoList(this.db, newTodoList);
  }

  async updateAll(date?: Date): Promise<TodoList> {
    this.todoList.forEach((el) => this.updateTodoState(el, date));
    const newTodoList = await this.db.editMany([...this.todoList].map((el) => ({ id: el.id, todo: el.toPlain() })));
    return new TodoList(this.db, newTodoList);
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
    const changedTodoSet = new Set<Todo>();
    this.checkCircularReference(newTodo.toPlain());

    [this.getPrev(newTodo), this.getNext(newTodo)].flat().forEach((el) => changedTodoSet.add(el));

    this.getPrev(newTodo).forEach((el) => el.addNext(newTodo.id));
    this.updateTodoState(newTodo);
    this.getNext(newTodo).forEach((el) => el.addPrev(newTodo.id));
    this.getNext(newTodo).forEach((el) => this.updateTodoState(el));

    await this.db.add(newTodo.toPlain());
    const newTodoList = await this.db.editMany([...changedTodoSet].map((el) => ({ id: el.id, todo: el.toPlain() })));
    return new TodoList(this.db, newTodoList);
  }

  async edit(id: string, todo: InputTodo): Promise<TodoList> {
    const oldTodo = this.todoList.find((el) => el.id === id);
    if (oldTodo === undefined) throw new Error('ERROR: 수정하려는 ID의 Todo가 존재하지 않습니다.');
    const newTodo = new Todo({ ...oldTodo.toPlain(), ...todo, id: oldTodo.id });
    this.checkCircularReference(newTodo.toPlain());
    const changedTodoSet = new Set<Todo>();

    [this.getPrev(oldTodo), this.getPrev(newTodo), this.getNext(oldTodo), this.getNext(newTodo), newTodo]
      .flat()
      .forEach((el) => changedTodoSet.add(el));

    this.getPrev(oldTodo).forEach((el) => el.removeNext(oldTodo.id));
    this.getPrev(newTodo).forEach((el) => el.addNext(newTodo.id));
    this.updateTodoState(newTodo);
    this.getNext(oldTodo).forEach((el) => el.removePrev(oldTodo.id));
    this.getNext(newTodo).forEach((el) => el.addPrev(newTodo.id));
    this.getNext(oldTodo).forEach((el) => this.updateTodoState(el));
    oldTodo.state = newTodo.state;
    this.getNext(newTodo).forEach((el) => this.updateTodoState(el));

    const newTodoList = await this.db.editMany([...changedTodoSet].map((el) => ({ id: el.id, todo: el.toPlain() })));
    return new TodoList(this.db, newTodoList);
  }

  async remove(id: string): Promise<TodoList> {
    const newTodo = this.todoList.find((el) => el.id === id);
    if (newTodo === undefined) throw new Error('ERROR: 지우려는 ID의 Todo가 존재하지 않습니다.');

    const changedTodoSet = new Set<Todo>();
    [this.getPrev(newTodo), this.getNext(newTodo)].flat().forEach((el) => changedTodoSet.add(el));

    this.getPrev(newTodo).forEach((el) => el.removeNext(newTodo.id));
    this.getNext(newTodo).forEach((el) => el.removePrev(newTodo.id));
    this.getNext(newTodo).forEach((el) => this.updateTodoState(el));

    await this.db.remove(newTodo.id);
    const newTodoList = await this.db.editMany([...changedTodoSet].map((el) => ({ id: el.id, todo: el.toPlain() })));
    return new TodoList(this.db, newTodoList);
  }

  async getSortedListWithFilter(
    filter: (todo: Todo) => boolean,
    compareArr: SortCommand[],
    today?: Date,
  ): Promise<PlainTodo[]> {
    const filteredCompareArr = compareArr.filter((el) => el.direction !== 'NONE');
    const combinedCompare =
      filteredCompareArr.length === 0
        ? today === undefined
          ? defaultCompare
          : getDefaultCompareForSpecificDate(today)
        : generateCompare(filteredCompareArr, today);

    const newTodoList = this.todoList.filter((el) => filter(el)).sort(combinedCompare);
    return newTodoList.map((el) => el.toPlain());
  }

  async getSortedList(type: 'READY' | 'WAIT' | 'DONE', compareArr: SortCommand[], today?: Date): Promise<PlainTodo[]> {
    return await this.getSortedListWithFilter((todo) => type === todo.state, compareArr, today);
  }

  async getTodoById(id: string): Promise<PlainTodo | undefined> {
    return this.todoList.find((el) => el.id === id)?.toPlain();
  }

  async getTodoBySearchKeyword(keyword: string): Promise<PlainTodo[]> {
    const regExp = new RegExp(`${keyword}`, 'g');

    const searchTodoList = this.todoList.filter((el) => el.title.match(regExp));
    return searchTodoList.map((el) => el.toPlain());
  }

  async getTodoByIdList(idList: string[]): Promise<PlainTodo[]> {
    const newTodoList = idList.reduce<PlainTodo[]>((acc, id) => {
      const todo = this.todoList.find((el) => el.id === id)?.toPlain();
      if (todo !== undefined) acc.push(todo);
      return acc;
    }, []);
    return newTodoList;
  }

  clone(): TodoList {
    return new TodoList(
      this.db,
      this.todoList.map((el) => el.toPlain()),
    );
  }

  private checkCircularReference(todo: PlainTodo): boolean {
    const { prev, next, id } = todo;
    const dfsForward = (targetId: string): boolean => {
      if (targetId === id || prev.includes(targetId)) return false;
      const target = this.todoList.find((el) => el.id === targetId);
      if (target === undefined) throw new Error('순환 참조 판별 중, id로 확인할 수 없는 Todo가 있습니다.');
      return [...target.next].every(dfsForward);
    };
    const dfsBackward = (targetId: string): boolean => {
      if (targetId === id || next.includes(targetId)) return false;
      const target = this.todoList.find((el) => el.id === targetId);
      if (target === undefined) throw new Error('순환 참조 판별 중, id로 확인할 수 없는 Todo가 있습니다.');
      return [...target.prev].every(dfsBackward);
    };
    const result = next
      .map((el) => ({ id: el, check: dfsForward(el) }))
      .concat(prev.map((el) => ({ id: el, check: dfsBackward(el) })));
    const errorArr = [
      ...new Set(
        result.filter((el) => !el.check).map((el) => this.todoList.find((target) => target.id === el.id)?.title),
      ),
    ];
    if (errorArr.length !== 0)
      throw new Error(`순환 참조를 유발하는 선후 관계가 있습니다. 원인: [${errorArr.join(', ')}]`);
    return errorArr.length === 0;
  }
}
