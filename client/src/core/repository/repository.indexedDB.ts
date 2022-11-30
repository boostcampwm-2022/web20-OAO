import { Todo } from '@todo/todo';
import { PlainTodo, InputTodo } from '@todo/todo.type';
import { ITodoListDataBase } from '@repository/repository.interface';
import { IDBPDatabase, openDB } from 'idb';

const DB_NAME = 'OaO';
const TABLE_NAME = 'todos';

export class IndexedDBFactory {
  async createDB(todoList?: InputTodo[]): Promise<IndexedDB> {
    const db: IDBPDatabase = await openDB(DB_NAME, 1, {
      upgrade(db: IDBPDatabase) {
        if (!db.objectStoreNames.contains(TABLE_NAME)) db.createObjectStore(TABLE_NAME, { keyPath: 'id' });
      },
    });
    const result = new IndexedDB(db);
    if (todoList === undefined) return result;
    for (const todo of todoList) {
      await result.add(todo);
    }
    return result;
  }
}

class IndexedDB implements ITodoListDataBase {
  private readonly db: IDBPDatabase;
  constructor(db: IDBPDatabase) {
    this.db = db;
  }

  async get(id: string): Promise<PlainTodo | undefined> {
    const result = await this.db.get(TABLE_NAME, id);
    return result as PlainTodo | undefined;
  }

  async getAll(): Promise<PlainTodo[]> {
    const result = await this.db.getAll(TABLE_NAME);
    return result as PlainTodo[];
  }

  async add(todo: InputTodo): Promise<PlainTodo[]> {
    const newTodo = new Todo(todo).toPlain();
    await this.db.add(TABLE_NAME, newTodo);
    return await this.getAll();
  }

  async edit(id: string, todo: InputTodo): Promise<PlainTodo[]> {
    const oldTodo = (await this.get(id)) as PlainTodo;
    const newTodo = new Todo({ ...oldTodo, ...todo, id: oldTodo.id }).toPlain();
    await this.db.put(TABLE_NAME, newTodo);
    return await this.getAll();
  }

  async editMany(inputArr: Array<{ id: string; todo: InputTodo }>): Promise<PlainTodo[]> {
    for (const el of inputArr) {
      await this.edit(el.id, el.todo);
    }
    return await this.getAll();
  }

  async remove(id: string): Promise<PlainTodo[]> {
    await this.db.delete(TABLE_NAME, id);
    return await this.getAll();
  }
}
