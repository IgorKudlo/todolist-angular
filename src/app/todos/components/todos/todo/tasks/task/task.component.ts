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

  isEditMode = false;
  taskTitle = '';
  taskStatusEnum = TaskStatusEnum;

  removeTaskHandler() {
    this.removeTaskEvent.emit({ todolistId: this.task.todoListId, taskId: this.task.id });
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked;
    this.changeTask({ status: newStatus ? TaskStatusEnum.completed : TaskStatusEnum.active });
  }

  showActiveMode() {
    this.isEditMode = true;
    this.taskTitle = this.task.title;
  }

  changeTaskTitleHandler() {
    this.changeTask({ title: this.taskTitle });
    this.isEditMode = false;
  }

  changeTask(patch: Partial<UpdateTaskModel>) {
    const model: UpdateTaskModel = {
      status: this.task.status,
      title: this.task.title,
      completed: this.task.completed,
      startDate: this.task.startDate,
      priority: this.task.priority,
      description: this.task.description,
      deadline: this.task.deadline,
      ...patch,
    };
    this.changeTaskEvent.emit({ todolistId: this.task.todoListId, taskId: this.task.id, model });
  }
}
