import { GetTaskResponse } from './../model/tasks.model';
import { BasicAgent } from './Basic.agent';
import { BASE_URL } from './Task.agent.constants';
import {
  GetAllTasksResponse,
  GetAllTasksQuery,
  UpdateTaskResponse,
  UpdateTaskRequest,
  PostTaskRequest,
  PostTaskResponse,
} from 'http/model';

class TasksAgent extends BasicAgent {
  constructor() {
    super(BASE_URL.GET_TASKS as string);
  }

  async getAllTasks(params?: GetAllTasksQuery): Promise<GetAllTasksResponse> {
    const { data } = await this._http.get<GetAllTasksResponse>('', { params });

    return data;
  }

  async updateTask(taskId: string | null, newTaskParams: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { data } = await this._http.patch<UpdateTaskResponse>(`${taskId}`, newTaskParams);

    return data;
  }

  async deleteTask(taskId: string): Promise<void> {
    await this._http.delete(`${taskId}`);
  }

  async getTask(taskId: string | null): Promise<GetTaskResponse> {
    const { data } = await this._http.get<GetTaskResponse>(`${taskId}`);

    return data;
  }

  async createTask(TaskParams: PostTaskRequest): Promise<PostTaskResponse> {
    const { data } = await this._http.post<PostTaskResponse>('', TaskParams);

    return data;
  }
}

export const TaskAgentInstance = new TasksAgent();
