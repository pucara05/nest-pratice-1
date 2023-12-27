import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@Controller('todos')
@ApiTags('Todo') // Etiqueta para agrupar los endpoints relacionados
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas' }) // Documentar el endpoint
  @ApiResponse({ status: 200, description: 'OK', type: Todo, isArray: true }) // Documentar la respuesta
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por ID' }) // Documentar el endpoint
  @ApiResponse({ status: 200, description: 'OK', type: Todo }) // Documentar la respuesta
  @ApiResponse({ status: 404, description: 'Not Found' }) // Documentar la respuesta
  async findOne(@Param('id') id: number): Promise<Todo | undefined> {
    const todo = await this.todoService.findOne(id);
    if (!todo) {
      throw new NotFoundException('Todo with ID ${id} not found');
    }

    return todo;
  }
  /*
  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' }) // Documentar el endpoint
  @ApiResponse({ status: 201, description: 'Created', type: Todo }) // Documentar la respuesta
  async create(@Body() todoData: Partial<Todo>): Promise<Todo> {
    const todo = await this.todoService.create(todoData as Todo); // Aquí se realiza un casting a tipo 'Todo'
    return todo;
  }
*/

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' }) // Documentar el endpoint
  @ApiResponse({ status: 201, description: 'Created', type: Todo }) // Documentar la respuesta
  async create(@Body() todoData: Todo): Promise<Todo> {
    const createdTodo = await this.todoService.create(todoData);
    return createdTodo;
  }

  /*
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tarea por ID' }) // Documentar el endpoint
  @ApiResponse({ status: 200, description: 'OK', type: Todo }) // Documentar la respuesta
  @ApiResponse({ status: 404, description: 'Not Found' }) // Documentar la respuesta
  async update(
    @Param('id') id: number,
    @Body() updateTodo: Partial<Todo>,
  ): Promise<Todo | undefined> {
    const todo = await this.todoService.update(id, updateTodo as Todo); // Casting a tipo 'Todo'

    return todo;
  }*/

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tarea por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarea a actualizar' })
  @ApiOkResponse({ description: 'Tarea actualizada correctamente', type: Todo })
  @ApiNotFoundResponse({ description: 'No se encontró la tarea' })
  async update(
    @Param('id') id: number,
    @Body() updateTodo: Todo,
  ): Promise<Todo | undefined> {
    const todo = await this.todoService.update(id, updateTodo);

    return todo;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea por ID' }) // Documentar el endpoint
  @ApiResponse({ status: 200, description: 'OK' }) // Documentar la respuesta
  @ApiResponse({ status: 404, description: 'Not Found' }) // Documentar la respuesta
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.todoService.remove(id);
  }
}
