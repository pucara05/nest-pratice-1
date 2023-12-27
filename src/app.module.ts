import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'daniel',
      password: '1090525041',
      database: 'bd-nest-1',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TodoModule, // Importar el todomodule aqui
  ],
})
export class AppModule {}
