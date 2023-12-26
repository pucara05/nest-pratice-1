import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async create(todo: Todo): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  async findOne(id: number): Promise<Todo | undefined> {
    return this.todoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTodo: Todo): Promise<Todo> {
    await this.todoRepository.update(id, updateTodo);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
