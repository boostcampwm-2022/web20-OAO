import { PlainTodo, InputTodo } from '@todo/todo.type';
import { ITodoListDataBase } from '@repository/repository.interface';
import { IDBPDatabase, openDB } from 'idb';

const DB_NAME = 'OaO';
const TABLE_NAME = 'todos';

export class IndexedDBFactory {
  async createDB(): Promise<IndexedDB> {
    const db: IDBPDatabase = await openDB(DB_NAME, 1, {
      upgrade(db: IDBPDatabase) {
        if (!db.objectStoreNames.contains(TABLE_NAME)) db.createObjectStore(TABLE_NAME);
      },
    });

    return new IndexedDB(db);
  }
}

export class IndexedDB implements ITodoListDataBase {
  private readonly db: IDBPDatabase;
  constructor(db: IDBPDatabase, todoList?: InputTodo[]) {
    this.db = db;
  }

  async get(id: string): Promise<PlainTodo | undefined> {
    const tx = this.db.transaction(TABLE_NAME, 'readonly');
    const store = tx.objectStore(TABLE_NAME);
    const result = await store.get(id);
    return result as PlainTodo | undefined;
  }

  async getAll(): Promise<PlainTodo[]> {
    const tx = this.db.transaction(TABLE_NAME, 'readonly');
    const store = tx.objectStore(TABLE_NAME);
    const result = await store.getAll();
    return result as PlainTodo[];
  }

  async add(todo: InputTodo): Promise<PlainTodo[]> {
    const tx = this.db.transaction(TABLE_NAME, 'readwrite');
    const store = tx.objectStore(TABLE_NAME);
    const newTodo = new Todo(todo).toPlain();
    await store.add(newTodo, newTodo.id);
    return await this.getAll();
  }

  async edit(id: string, todo: InputTodo): Promise<PlainTodo[]> {
    const tx = this.db.transaction(TABLE_NAME, 'readwrite');
    const store = tx.objectStore(TABLE_NAME);
    const oldTodo = (await this.get(id)) as PlainTodo;
    const newTodo = new Todo({ ...oldTodo, ...todo, id: oldTodo.id }).toPlain();
    await store.put(newTodo, newTodo.id);
    return await this.getAll();
  }

  async editMany(inputArr: Array<{ id: string; todo: InputTodo }>): Promise<PlainTodo[]> {
    for (const el of inputArr) {
      await this.edit(el.id, el.todo);
    }
    return await this.getAll();
  }

  async remove(id: string): Promise<PlainTodo[]> {
    const tx = this.db.transaction(TABLE_NAME, 'readwrite');
    const store = tx.objectStore(TABLE_NAME);
    await store.delete(id);
    return await this.getAll();
  }
}
