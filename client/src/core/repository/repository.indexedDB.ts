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
