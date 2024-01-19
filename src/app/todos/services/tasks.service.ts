import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomainTask, GetTasksResponse, Task, UpdateTaskModel } from '../models/tasks.models';
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

  removeTask(data: { todolistId: string; taskId: string }) {
    this.http
      .delete<CommonResponse>(
        `${environment.baseURL}/todo-lists/${data.todolistId}/tasks/${data.taskId}`,
      )
      .pipe(
        map(() => {
          const stateTasks = this.tasks$.getValue();
          return {
            ...stateTasks,
            [data.todolistId]: stateTasks[data.todolistId].filter(
              (task) => task.id !== data.taskId,
            ),
          };
        }),
      )
      .subscribe((tasks) => {
        this.tasks$.next(tasks);
      });
  }

  updateTask(data: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    this.http
      .put<CommonResponse>(
        `${environment.baseURL}/todo-lists/${data.todolistId}/tasks/${data.taskId}`,
        data.model,
      )
      .pipe(
        map(() => {
          const stateTasks = this.tasks$.getValue();
          const tasksForTodo = stateTasks[data.todolistId];
          const newTasks = tasksForTodo.map((task) => {
            if (task.id === data.taskId) {
              return { ...task, ...data.model };
            } else {
              return task;
            }
          });
          stateTasks[data.todolistId] = newTasks;
          return stateTasks;
        }),
      )
      .subscribe((tasks) => this.tasks$.next(tasks));
  }
}
