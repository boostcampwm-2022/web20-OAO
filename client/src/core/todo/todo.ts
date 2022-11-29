import { uuid } from 'uuidv4';
import { PlainTodo, InputTodo } from '@todo/todoList.type';
import { isEqualDate } from '@todo/todo.util';

const DAY = 24 * 60 * 60 * 1000;

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

  toPlain(): PlainTodo {
    return {
      ...this,
      prev: [...this.prev],
      next: [...this.next],
      from: new Date(this.from),
      until: new Date(this.until),
      lastPostponed: new Date(this.lastPostponed),
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
