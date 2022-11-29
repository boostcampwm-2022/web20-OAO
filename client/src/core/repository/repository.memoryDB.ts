import { Todo } from '@todo/todo';
import { PlainTodo, InputTodo } from '@todo/todo.type';
import { ITodoListDataBase } from '@repository/repository.interface';

export class MemoryDB implements ITodoListDataBase {
  private readonly todoList: Map<string, Todo>;
  constructor(todoList?: InputTodo[]) {
    const newTodoList = todoList ?? [];
    this.todoList = new Map(
      newTodoList.map((el) => {
        const newTodo = new Todo(el);
        return [newTodo.id, newTodo];
      }),
    );
  }

  async get(id: string): Promise<PlainTodo | undefined> {
    return this.todoList.get(id)?.toPlain();
  }

  async getAll(): Promise<PlainTodo[]> {
    return [...this.todoList.values()].map((el) => el.toPlain());
  }

  async add(todo: InputTodo): Promise<PlainTodo[]> {
    const newTodo = new Todo(todo);
    this.todoList.set(newTodo.id, newTodo);
    return [...this.todoList.values()].map((el) => el.toPlain());
  }

  async edit(id: string, todo: InputTodo): Promise<PlainTodo[]> {
    if (!this.todoList.has(id)) throw new Error('ERROR: 수정하려는 ID의 Todo가 없습니다.');
    const oldTodo = (await this.get(id)) as PlainTodo;
    const newTodo = new Todo({ ...oldTodo, ...new Todo(todo).toPlain(), id: oldTodo.id });
    this.todoList.set(id, newTodo);
    return [...this.todoList.values()].map((el) => el.toPlain());
  }

  async remove(id: string): Promise<PlainTodo[]> {
    if (!this.todoList.has(id)) throw new Error('ERROR: 삭제하려는 ID의 Todo가 없습니다.');
    this.todoList.delete(id);
    return [...this.todoList.values()].map((el) => el.toPlain());
  }
}
