class Todo {
  state: 'READY' | 'DONE' | 'WAIT';
  constructor() {
    this.state = 'DONE';
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
}

export class TodoList {
  todoList: Todo[];
  constructor() {
    this.todoList = [];
  }

  getRTL(): Todo[] {
    return [];
  }

  getWTL(): Todo[] {
    return [];
  }

  getDTL(): Todo[] {
    return [];
  }

  getActiveTodo(): Todo {
    return new Todo();
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
