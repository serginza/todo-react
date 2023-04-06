import { observer } from 'mobx-react';
import React from 'react';
import { Task } from '../Task';
import { TasksStoreInstance } from 'modules/Tasks/store';
import { Loader } from 'components/Loader';
import './TasksList.css';

function TasksListProto() {
  const { isTasksLoading, tasks, changeTaskImportant, deleteTask, changeTaskCompleted } = TasksStoreInstance;

  return (
    <div className="tasks-wrapper d-flex align-items-center justify-content-center">
      <Loader isLoading={isTasksLoading}>
        {tasks?.length ? (
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
        ) : (
          <p>Not found</p>
        )}
      </Loader>
    </div>
  );
}

export const TasksList = observer(TasksListProto);
