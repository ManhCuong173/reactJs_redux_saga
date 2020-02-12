import React from 'react';
import AdminHomePage from './../containers/AdminHomePage';
import TaskBoardPage from './../containers/TaskBoard/index';

export const ADMIN_ROUTES = [
  {
    path: '/',
    name: 'Admin Page',
    exact: true,
    component: <AdminHomePage />,
  },
  {
    path: '/task-board',
    name: 'Task Board Page',
    component: <TaskBoardPage />,
    exact: true,
  },
];
