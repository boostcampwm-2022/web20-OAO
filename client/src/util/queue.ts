interface QueueObj<T> {
  prev: QueueObj<T> | undefined;
  next: QueueObj<T> | undefined;
  value: T | undefined;
}

class Queue<T> {
  private head: QueueObj<T>;
  private tail: QueueObj<T>;
  #length: number;
  constructor(defaultArr: T[]) {
    this.head = { prev: undefined, next: undefined, value: undefined };
    this.tail = { prev: this.head, next: undefined, value: undefined };
    this.head.next = this.tail;
    this.#length = 0;
    defaultArr.forEach((el) => this.push(el));
  }

  length(): number {
    return this.#length;
  }

  isEmpty(): boolean {
    if (this.length() === 0) return true;
    return false;
  }

  private pushOne(input: T): void {
    const newQueueObj = { value: input, prev: this.tail.prev, next: this.tail };
    if (this.tail.prev != null) this.tail.prev.next = newQueueObj;
    this.tail.prev = newQueueObj;
    this.#length++;
  }

  push(...input: T[]): void {
    input.forEach((el) => this.pushOne(el));
  }

  pop(): T {
    const target = this.head.next;
    if (this.isEmpty() || target === undefined) throw new Error('Error: You cant pop from empty queue');
    this.head.next = target.next;
    if (target.next != null) target.next.prev = this.head;
    this.#length--;
    return target.value as T;
  }
}

export default Queue;
