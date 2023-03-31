import React from 'react';
import { Link } from 'react-router-dom';
import { TaskProps } from './Task.types';
import { EDIT, ROOT } from 'constants/index';
// import { TasksStoreInstance } from 'modules/Tasks/store';
import './Task.css';

export function Task({ task, changeTaskImportant, changeTaskCompleted, deleteTask }: TaskProps) {
  const { name, info, isImportant, isDone, id } = task;

  const onBtnImportantTask = () => {
    changeTaskImportant(id, isImportant);
  };

  const onBtnDoneTask = () => {
    changeTaskCompleted(id, isDone);
  };

  const onBtnDeleteTask = () => {
    deleteTask(id);
  };

  return (
    <div>
      <div className="task mb-2">
        <p
          className={`task__label ${isDone ? 'text-decoration-line-through text-secondary' : ''} ${
            isImportant ? 'text-success fw-bold' : ''
          }`}>
          {name}
        </p>

        <div className="task__btns">
          <button
            type="button"
            className={`task__btn btn ${
              isImportant ? 'btn-success' : 'btn-outline-success'
            } btn-sm float-right btn-important`}
            disabled={isDone}
            onClick={onBtnImportantTask}>
            <i className="fa fa-exclamation" />
          </button>

          <button
            type="button"
            className={`task__btn btn ${isDone ? 'btn-danger' : 'btn-outline-danger'} btn-sm float-right`}
            onClick={onBtnDoneTask}>
            <i className="fa fa-check" />
          </button>

          <button
            type="button"
            className="task__btn btn btn-outline-danger btn-sm float-right btn-delete"
            onClick={onBtnDeleteTask}>
            <i className="fa fa-trash-o" />
          </button>

          <Link className="task__btn btn btn-outline-secondary btn-sm float-right" to={`${ROOT}${EDIT}/${id}`}>
            <i className="fa fa-pencil" />
          </Link>
        </div>
      </div>
      <p
        className={`${isDone ? 'text-decoration-line-through text-secondary' : ''} ${
          isImportant ? 'text-success fw-bold' : ''
        }`}>
        {info}
      </p>
    </div>
  );
}
