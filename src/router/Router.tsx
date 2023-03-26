import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TasksPage } from 'pages/index';
import { PATH_LIST } from 'constants/index';
import { AddTaskPage } from 'pages/AddTaskPage';
import { EditTaskPage } from 'pages/EditTaskPage';

export function Router() {
  return (
    <Routes>
      <Route path={PATH_LIST.ROOT} element={<TasksPage />} />
      <Route path={PATH_LIST.EDIT} element={<EditTaskPage />} />
      <Route path={PATH_LIST.ADD} element={<AddTaskPage />} />
    </Routes>
  );
}
