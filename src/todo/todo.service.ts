import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

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

  async createNew(todoData: Partial<Todo>): Promise<Todo> {
    const newTodo = this.todoRepository.create(todoData);
    return this.todoRepository.save(newTodo);
  }

  async findOne(id: number): Promise<Todo | undefined> {
    return this.todoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTodo: Todo): Promise<Todo> {
    await this.todoRepository.update(id, updateTodo);
    return this.findOne(id);
  }

  async updateNew(
    id: number,
    updatedTodo: Partial<Todo>,
  ): Promise<Todo | undefined> {
    const todoToUpdate = await this.todoRepository.findOne({ where: { id } });

    if (!todoToUpdate) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    Object.assign(todoToUpdate, updatedTodo);
    return this.todoRepository.save(todoToUpdate);
  }

  /*
  async delete(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  } */

  async remove(id: number): Promise<boolean> {
    const todoToRemove = await this.todoRepository.findOne({ where: { id } });

    if (!todoToRemove) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    await this.todoRepository.remove(todoToRemove);
    return true;
  }
}
