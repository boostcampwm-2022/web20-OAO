import { uuid } from 'uuidv4';

const DAY = 24 * 60 * 60 * 1000;

const onlyDate = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const isEqualDate = (d1: Date, d2: Date): boolean => onlyDate(d1).getTime() === onlyDate(d2).getTime();
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

export class Todo implements InputTodo {
  id: string;
  title: string;
  content: string;
  owner: string;
  importance: number;
  until: Date;
  from: Date;
  prev: string[];
  next: string[];
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
    this.prev = inputTodo.prev ?? [];
    this.next = inputTodo.next ?? [];
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
    return new Todo({
      ...this,
      from: new Date(this.from),
      until: new Date(this.until),
      lastPostponed: new Date(this.lastPostponed),
    });
  }

  toComparableTodo(): any {
    return {
      ...this,
      until: this.until.getTime(),
      from: this.from.getTime(),
      lastPostponed: this.lastPostponed.getTime(),
    };
  }
}

export class TodoList {
  private readonly todoList: Todo[];
  constructor(todoList: InputTodo[]) {
    this.todoList = todoList.map((el) => new Todo(el));
  }

  getRTL(): Todo[] {
    return this.todoList.filter((el) => el.state === 'READY').map((el) => el.clone());
  }

  getWTL(): Todo[] {
    return this.todoList.filter((el) => el.state === 'WAIT').map((el) => el.clone());
  }

  getDTL(): Todo[] {
    return this.todoList.filter((el) => el.state === 'DONE').map((el) => el.clone());
  }

  async getActiveTodo(): Promise<InputTodo> {
    return { ...this.getSortedRTL()[0].clone() };
  }

  getActiveTodoAsInstance(): Todo {
    return this.getSortedRTL()[0].clone();
  }

  getSortedRTL(today?: Date): Todo[] {
    return this.getRTL().sort(Todo.compare(today));
  }

  sort(): Todo[] {
    return [];
  }

  async postponeTemporally(): Promise<TodoList> {
    this.getActiveTodoAsInstance().postponeTemporally();
    return new TodoList(this.todoList);
  }

  async postponeDeadline(): Promise<TodoList> {
    this.getActiveTodoAsInstance().postponeDeadline();
    return new TodoList(this.todoList);
  }

  async postponeForToday(): Promise<TodoList> {
    this.getActiveTodoAsInstance().postponeForToday().setWait();
    return new TodoList(this.todoList);
  }

  async lowerImportance(): Promise<TodoList> {
    this.getActiveTodoAsInstance().lowerImportance();
    return new TodoList(this.todoList);
  }

  async setDone(): Promise<TodoList> {
    this.getActiveTodoAsInstance()
      .setDone()
      .next.forEach((nid) => {
        const nextTodo = this.todoList.find((el) => el.id === nid);
        if (nextTodo === undefined) return;
        if (
          nextTodo.prev.every((pid) => this.todoList.find((el) => el.id === pid)?.state === 'DONE') &&
          nextTodo.isFromBeforeToday()
        ) {
          return nextTodo.setReady();
        }
        return nextTodo.setWait();
      });

    return new TodoList(this.todoList);
  }

  async updateElapsedTime(elapsedTime: number): Promise<TodoList> {
    this.getActiveTodoAsInstance().updateElapsedTime(elapsedTime);
    return new TodoList(this.todoList);
  }

  getSummary(): any {
    return '';
  }

  async add(todo: InputTodo): Promise<TodoList> {
    this.todoList.push(new Todo(todo));
    return new TodoList(this.todoList);
  }

  async edit(id: string, todo: InputTodo): Promise<TodoList> {
    return new TodoList(this.todoList);
  }

  async remove(id: string): Promise<TodoList> {
    return new TodoList(this.todoList);
  }

  async getSortedList(type: string, compareArr: string[]): Promise<TodoList> {
    return new TodoList(this.todoList);
  }
}
