import { CreateTaskUseCase } from "@/tasks/application/create-task.use-case";
import { DeleteTaskUseCase } from "@/tasks/application/delete-task.use-case";
import { GetTaskByIdUseCase } from "@/tasks/application/get-task-by-id.use-case";
import { UpdateTaskUseCase } from "@/tasks/application/update-task.use-case";
import { ITaskRepositoryToken } from "@/tasks/domain/task.repository.interface";
import type { ITaskRepository } from "@/tasks/domain/task.repository.interface";
import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateTaskDto } from "./dtos/create-task.dto";

@ApiTags("Tasks")
@Controller({ path: "tasks", version: '1' })
export class TasksController {

    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase,
        private readonly getTaskByIdUseCase: GetTaskByIdUseCase,
        private readonly updateTaskUseCase: UpdateTaskUseCase,
        private readonly deleteTaskUseCase: DeleteTaskUseCase,
        @Inject(ITaskRepositoryToken) 
        private readonly taskRepository: ITaskRepository
    ) {}

    @Get()
    @ApiOperation({ summary: 'Listar todas las tareas' })
    async findAll() {
        return this.taskRepository.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva tarea' })
    @ApiResponse({ status: 201, description: 'Creada correctamente' })
    async create(@Body() task: CreateTaskDto) {
        return this.createTaskUseCase.execute(task.title, task.description);
    }




}