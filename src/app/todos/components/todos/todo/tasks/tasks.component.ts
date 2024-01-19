import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '../../../../services/tasks.service';
import { map, Observable } from 'rxjs';
import { Task, UpdateTaskModel } from '../../../../models/tasks.models';

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todolistId!: string;

  tasks$?: Observable<Task[]>;
  taskTitle = '';

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasks$ = this.tasksService.tasks$.pipe(
      map((tasks) => {
        return tasks[this.todolistId];
      }),
    );
    this.tasksService.getTasks(this.todolistId);
  }

  addTaskHandler() {
    this.tasksService.addTask(this.todolistId, this.taskTitle);
    this.taskTitle = '';
  }

  removeTask(data: { todolistId: string; taskId: string }) {
    this.tasksService.removeTask(data);
  }

  changeTask(data: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    this.tasksService.updateTask(data);
  }
}
