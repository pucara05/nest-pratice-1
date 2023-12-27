// todo.entity.ts

import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identificador único de la tarea' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Título de la tarea' })
  title: string;

  @Column({ default: false })
  @ApiProperty({ description: 'Estado de finalización de la tarea' })
  completed: boolean;
}
