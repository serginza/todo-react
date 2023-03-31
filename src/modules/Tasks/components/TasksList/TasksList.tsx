import { observer } from 'mobx-react';
import React from 'react';
import { Task } from '../Task';
// import { TaskListProps } from './TasksList.types';
import { TasksStoreInstance } from 'modules/Tasks/store';
import { Loader } from 'components/Loader';
import './TasksList.css';

function TasksListProto() {
  const { tasks, isTasksLoading, changeTaskImportant, changeTaskCompleted, deleteTask } = TasksStoreInstance;
  return (
    <div className="tasks-wrapper d-flex align-items-center justify-content-center">
      <Loader isLoading={isTasksLoading}>
        <ul className="list-group todo-list mb-3">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item">
              <Task
                key={task.id}
                task={task}
                changeTaskImportant={changeTaskImportant}
                deleteTask={deleteTask}
                changeTaskCompleted={changeTaskCompleted}
              />
            </li>
          ))}
        </ul>
      </Loader>
    </div>
  );
}

export const TasksList = observer(TasksListProto);
