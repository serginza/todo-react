import { GetTaskResponse } from './../model/tasks.model';
import { BasicAgent } from './Basic.agent';
import { GetAllTasksResponse, GetAllTasksQuery, UpdateTaskResponse, UpdateTaskRequest } from 'http/model';

class TasksAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  async getAllTasks(params?: GetAllTasksQuery): Promise<GetAllTasksResponse> {
    const { data } = await this._http.get<GetAllTasksResponse>('/tasks', { params });

    return data;
  }

  async updateTask(taskId: string | null, newTaskParams: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { data } = await this._http.patch<UpdateTaskResponse>(`/tasks/${taskId}`, newTaskParams);

    return data;
  }

  async deleteTask(taskId: string): Promise<void> {
    await this._http.delete(`/tasks/${taskId}`);
  }

  async getTask(taskId: string | null): Promise<GetTaskResponse> {
    const { data } = await this._http.get<GetTaskResponse>(`/tasks/${taskId}`);

    return data;
  }

  async createTask(TaskParams: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { data } = await this._http.post<UpdateTaskResponse>('/tasks', TaskParams);

    return data;
  }
}

export const TaskAgentInstance = new TasksAgent();
