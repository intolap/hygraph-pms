import { lazy } from 'react';
import Loadable from 'app/components/Loadable';
import { authRoles } from '../auth/authRoles';

// const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
const AddPlayer = Loadable(lazy(() => import('./Players/AddPlayer')));

const pagesRoutes = [
  { path: '/pages/add-player', auth: authRoles.CCS, element: <AddPlayer /> }
];

export default pagesRoutes;
