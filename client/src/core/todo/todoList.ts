import { uuid } from 'uuidv4';

const DAY = 24 * 60 * 60 * 1000;

const onlyDate = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const isEqualDate = (d1: Date, d2: Date): boolean => onlyDate(d1).getTime() === onlyDate(d2).getTime();

const compareFunctions = {
  ascendImminence: (a: Todo, b: Todo): number => {
    const newToday = new Date();
    return -Number(isEqualDate(newToday, a.until)) + Number(isEqualDate(newToday, b.until));
  },
  descendImminence: (a: Todo, b: Todo): number => {
    const newToday = new Date();
    return Number(isEqualDate(newToday, a.until)) - Number(isEqualDate(newToday, b.until));
  },
  ascendDeadline: (a: Todo, b: Todo): number => a.until.getTime() - b.until.getTime(),
  descendDeadline: (a: Todo, b: Todo): number => -a.until.getTime() + b.until.getTime(),
  ascendImportance: (a: Todo, b: Todo): number => -b.importance + a.importance,
  descendImportance: (a: Todo, b: Todo): number => b.importance - a.importance,
  ascendLastPostponed: (a: Todo, b: Todo): number => a.lastPostponed.getTime() - b.lastPostponed.getTime(),
  descendLastPostponed: (a: Todo, b: Todo): number => -a.lastPostponed.getTime() + b.lastPostponed.getTime(),
  ascendTitle: (a: Todo, b: Todo): number => {
    if (a.title === b.title) return 0;
    if (a.title < b.title) return -1;
    return 1;
  },
  descendTitle: (a: Todo, b: Todo): number => {
    if (a.title === b.title) return 0;
    if (a.title < b.title) return 1;
    return -1;
  },
};

export interface InputTodo {
  id: string; // UUIDv4, 할일의 고유 id
  title: string; // VARCHAR(255), 할일의 이름
  content: string; // TEXT, 할일의 상세 내용
  owner: string; // UUIDv4, 할일 소유자의 id
  importance: number; // INT or ENUM, 할일의 우선순위 레벨
  until: Date | string; // DATE, 할일의 마감기한
  from: Date | string; // DATE, 할일의 시작기한
  prev: string[]; // or string[], 이전에 반드시 완료되어야 하는 할일 id 배열
  next: string[]; // or string[], 본 할일 이후에 실행되어야 하는 할일 id 배열
  elapsedTime: number;
  lastPostponed: Date | string;
  state: 'READY' | 'DONE' | 'WAIT';
}

export class Todo {
  id: string;
  title: string;
  content: string;
  owner: string;
  importance: number;
  until: Date;
  from: Date;
  prev: Set<string>;
  next: Set<string>;
  elapsedTime: number;
  lastPostponed: Date;
  state: 'READY' | 'DONE' | 'WAIT';
  constructor(inputTodo: InputTodo) {
    this.id = inputTodo.id ?? uuid();
    this.title = inputTodo.title ?? 'default title';
    this.content = inputTodo.content ?? 'default content';
    this.owner = inputTodo.owner ?? 'default user';
    this.importance = inputTodo.importance ?? 1;
    this.until = new Date(inputTodo.until ?? new Date(2077, 1, 1));
    this.from = new Date(inputTodo.from ?? new Date(1994, 1, 1));
    this.prev = new Set(inputTodo.prev);
    this.next = new Set(inputTodo.next);
    this.elapsedTime = inputTodo.elapsedTime ?? 0;
    this.lastPostponed = new Date(inputTodo.lastPostponed ?? new Date());
    this.state = inputTodo.state ?? 'READY';
  }

  postponeTemporally(): Todo {
    this.lastPostponed = new Date();
    return this;
  }

  postponeDeadline(): Todo {
    this.until = new Date(this.until.getTime() + DAY);
    return this;
  }

  postponeForToday(): Todo {
    const today = new Date();
    this.from = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    return this;
  }

  lowerImportance(): Todo {
    this.importance = Math.max(this.importance - 1, 1);
    return this;
  }

  setReady(): Todo {
    this.state = 'READY';
    return this;
  }

  setWait(): Todo {
    this.state = 'WAIT';
    return this;
  }

  setDone(): Todo {
    this.state = 'DONE';
    return this;
  }

  isFromBeforeToday(): boolean {
    if (this.from.getTime() < new Date().getTime()) return true;
    return false;
  }

  updateElapsedTime(elapsedTime: number): Todo {
    this.elapsedTime = elapsedTime;
    return this;
  }

  static compare(date?: Date): (a: Todo, b: Todo) => number {
    const today = date ?? new Date();
    return (a: Todo, b: Todo): number => {
      const imminenceDiff = Number(isEqualDate(today, b.until)) - Number(isEqualDate(today, a.until));
      if (imminenceDiff !== 0) return imminenceDiff;

      const importanceDiff = b.importance - a.importance;
      if (importanceDiff !== 0) return importanceDiff;

      const deadlineDiff = a.until.getTime() - b.until.getTime();
      if (deadlineDiff !== 0) return deadlineDiff;

      const lastPostponedDiff = a.lastPostponed.getTime() - b.lastPostponed.getTime();
      if (lastPostponedDiff !== 0) return lastPostponedDiff;

      return 0;
    };
  }

  clone(): Todo {
    return new Todo(this.toPlain());
  }

  toPlain(): InputTodo {
    return {
      ...this,
      prev: [...this.prev],
      next: [...this.next],
      from: new Date(this.from),
      until: new Date(this.until),
      lastPostponed: new Date(this.lastPostponed),
    };
  }

  toComparableTodo(): any {
    return {
      ...this,
      until: this.until.getTime(),
      from: this.from.getTime(),
      lastPostponed: this.lastPostponed.getTime(),
    };
  }

  addPrev(id: string): Todo {
    this.prev.add(id);
    return this;
  }

  addNext(id: string): Todo {
    this.next.add(id);
    return this;
  }

  removePrev(id: string): Todo {
    this.prev.delete(id);
    return this;
  }

  removeNext(id: string): Todo {
    this.next.delete(id);
    return this;
  }
}
export class TodoList {
  private readonly todoList: Todo[];
  constructor(todoList: InputTodo[]) {
    this.todoList = todoList.map((el) => new Todo(el));
  }

  private getActiveTodoAsInstance(): Todo {
    return this.todoList.filter((el) => el.state === 'READY').sort(Todo.compare())[0];
  }

  async getActiveTodo(): Promise<InputTodo> {
    return this.getActiveTodoAsInstance().toPlain();
  }

  getSortedRTL(today?: Date): Todo[] {
    return this.todoList
      .filter((el) => el.state === 'READY')
      .map((el) => el.clone())
      .sort(Todo.compare(today));
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

  private checkFrom(todo: Todo): boolean {
    return todo.from < new Date();
  }

  private updateTodoState(todo: Todo): Todo {
    if (this.checkFrom(todo) && this.checkPrev(todo)) todo.state = 'READY';
    else todo.state = 'WAIT';
    return todo;
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

  async getSortedList(type: 'READY' | 'WAIT' | 'DONE', compareArr: string[]): Promise<TodoList> {
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
    this.todoList.filter((el) => el.state === type).sort(generateCompare(compareArr));
    return new TodoList(this.todoList.map((el) => el.toPlain()));
  }
}
