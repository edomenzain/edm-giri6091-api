import { Module } from "@nestjs/common";
import { TasksController } from "./controllers/tasks.controller";
import { CreateTaskUseCase } from "../application/create-task.use-case";
import { ITaskRepositoryToken } from "../domain/task.repository.interface";
import { TaskRepositoryImpl } from "./persistence/task.repository.impl";

@Module({
    controllers: [ TasksController ],
    providers: [
        CreateTaskUseCase,
        {
            provide: ITaskRepositoryToken,
            useClass: TaskRepositoryImpl    // Cambiar si la DB cambia
        }
    ],
    exports: [ CreateTaskUseCase ]
})
export class TasksModule { }
