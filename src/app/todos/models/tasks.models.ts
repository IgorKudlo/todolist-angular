export interface Task {
  id: string;
  title: string;
  description: string;
  todoListId: string;
  order: number;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  addedDate: string;
  completed: boolean;
}

export type UpdateTaskModel = Omit<Task, 'id' | 'todoListId' | 'order' | 'addedDate'>;

export interface GetTasksResponse {
  items: Task[];
  totalCount: number;
  error: string;
}

export interface DomainTask {
  [key: string]: Task[];
}
