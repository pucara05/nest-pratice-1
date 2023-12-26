import { Module } from '@nestjs/common';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TodoService],
})
export class AppModule {}
