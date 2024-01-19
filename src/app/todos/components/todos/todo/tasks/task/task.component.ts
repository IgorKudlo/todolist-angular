import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, UpdateTaskModel } from '../../../../../models/tasks.models';
import { TaskStatusEnum } from '../../../../../../core/enums/taskStatus.enum';

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() removeTaskEvent = new EventEmitter<{ todolistId: string; taskId: string }>();
  @Output() changeTaskEvent = new EventEmitter<{
    todolistId: string;
    taskId: string;
    model: UpdateTaskModel;
  }>();

  taskStatusEnum = TaskStatusEnum;

  removeTaskHandler() {
    this.removeTaskEvent.emit({ todolistId: this.task.todoListId, taskId: this.task.id });
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked;

    const model: UpdateTaskModel = {
      status: newStatus ? TaskStatusEnum.completed : TaskStatusEnum.active,
      title: this.task.title,
      completed: this.task.completed,
      startDate: this.task.startDate,
      priority: this.task.priority,
      description: this.task.description,
      deadline: this.task.deadline,
    };
    this.changeTaskEvent.emit({ todolistId: this.task.todoListId, taskId: this.task.id, model });
  }
}
