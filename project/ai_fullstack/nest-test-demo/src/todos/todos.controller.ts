import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Param,
    ParseIntPipe // 解析参数为整数
} from '@nestjs/common'
import { TodoService } from './todos.service';


@Controller('todos')
export class TodosController {
    constructor(private readonly todoService: TodoService) {}
    @Get()
    getTodos() {
        return this.todoService.findAll();
    }
    @Post()
    addTodo(@Body('title') title:string) {
        return this.todoService.addTodo(title);
    }
    @Delete(':id')
    deleteTodo(@Param('id', ParseIntPipe) id:number) {
        return this.todoService.deleteTodo(id);
    }
}   
