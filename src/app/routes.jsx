import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));
const ResetPassword = Loadable(lazy(() => import('app/views/sessions/ResetPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));


// projects page
const Projects = Loadable(lazy(() => import('app/views/projects/Projects')));

// tasks page
const Tasks = Loadable(lazy(() => import('app/views/tasks/Tasks')));

// tasks page
const TaskDetail = Loadable(lazy(() => import('app/views/task-detail/TaskDetail')));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      {
        path: '/dashboard/',
        element: <Analytics />,
        auth: authRoles.super
      },

      // projects route
      {
        path: '/projects/',
        element: <Projects />,
        auth: authRoles.super
      },

      // tasks route
      {
        path: '/tasks/:projectid',
        element: <Tasks />,
        auth: authRoles.super
      },

      // tasks route
      {
        path: '/task-detail/:taskid',
        element: <TaskDetail />,
        auth: authRoles.super
      },

      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.super
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  // { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },
  { path: '/session/reset-password/:token', element: <ResetPassword /> },

  { path: '/', element: <Navigate to="dashboard/" /> },
  { path: '*', element: <NotFound /> }


];

export default routes;
