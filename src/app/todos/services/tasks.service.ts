import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomainTask, GetTasksResponse, Task } from '../models/tasks.models';
import { BehaviorSubject, map } from 'rxjs';
import { CommonResponse } from '../../core/models/core.models';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks$ = new BehaviorSubject<DomainTask>({});

  constructor(private http: HttpClient) {}

  getTasks(todolistId: string) {
    return this.http
      .get<GetTasksResponse>(`${environment.baseURL}/todo-lists/${todolistId}/tasks`)
      .pipe(map((res) => res.items))
      .subscribe((tasks) => {
        const stateTasks = this.tasks$.getValue();
        stateTasks[todolistId] = tasks;
        this.tasks$.next(stateTasks);
      });
  }

  addTask(todolistId: string, taskTitle: string) {
    return this.http
      .post<CommonResponse<{ item: Task }>>(
        `${environment.baseURL}/todo-lists/${todolistId}/tasks`,
        {
          title: taskTitle,
        },
      )
      .pipe(
        map((res) => {
          const stateTasks = this.tasks$.getValue();
          const newTask = res.data.item;
          const newTasks = [newTask, ...stateTasks[todolistId]];
          stateTasks[todolistId] = newTasks;
          return stateTasks;
        }),
      )
      .subscribe((tasks) => {
        this.tasks$.next(tasks);
      });
  }
}
