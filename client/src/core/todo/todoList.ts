import { uuid } from 'uuidv4';

export interface InputTodo {
  id?: string; // UUIDv4, 할일의 고유 id
  title: string; // VARCHAR(255), 할일의 이름
  content?: string; // TEXT, 할일의 상세 내용
  owner: string; // UUIDv4, 할일 소유자의 id
  importance: number; // INT or ENUM, 할일의 우선순위 레벨
  until: Date; // DATE, 할일의 마감기한
  from?: Date; // DATE, 할일의 시작기한
  prev?: string[]; // or string[], 이전에 반드시 완료되어야 하는 할일 id 배열
  next?: string[]; // or string[], 본 할일 이후에 실행되어야 하는 할일 id 배열
  elapsedTime?: number;
  lastPostponed: Date;
  state: 'READY' | 'DONE' | 'WAIT';
}

class Todo {
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

  postponeTemporally(): void {}

  postponeDeadline(): void {}

  postponeForToday(): void {}

  lowerImportance(): void {}

  setDone(): void {}

  updateElapsedTime(): void {}

  static compare(a: Todo, b: Todo): number {
    return 1;
  }

  clone(): Todo {
    return {
      ...this,
      from: new Date(this.from),
      until: new Date(this.until),
      lastPostponed: new Date(this.lastPostponed),
    };
  }
}

export class TodoList {
  private readonly todoList: Todo[];
  constructor() {
    this.todoList = [];
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

  getActiveTodo(): Todo {
    return this.todoList[0].clone();
  }

  sort(): Todo[] {
    return [];
  }

  postponeTemporally(): Todo[] {
    return [];
  }

  postponeDeadline(): Todo[] {
    return [];
  }

  postponeForToday(): Todo[] {
    return [];
  }

  lowerImportance(): Todo[] {
    return [];
  }

  setDone(): Todo[] {
    return [];
  }

  updateElapsedTime(): Todo[] {
    return [];
  }

  getSummary(): any {
    return '';
  }
}
