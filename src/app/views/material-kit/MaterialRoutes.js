import { lazy } from 'react';
import Loadable from 'app/components/Loadable';

import { authRoles } from '../../auth/authRoles';

const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
const AppForm = Loadable(lazy(() => import('./forms/AppForm')));
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')));
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')));
const AppProgress = Loadable(lazy(() => import('./AppProgress')));
const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')));
const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')));
const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')));
const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')));
const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')));
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')));
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));
const AppAutoComplete = Loadable(lazy(() => import('./auto-complete/AppAutoComplete')));
const AppExpansionPanel = Loadable(lazy(() => import('./expansion-panel/AppExpansionPanel')));

const materialRoutes = [
  { path: '/material/table', element: <AppTable />, auth: authRoles.super },
  { path: '/material/form', element: <AppForm />, auth: authRoles.super },
  { path: '/material/buttons', element: <AppButton />, auth: authRoles.super },
  { path: '/material/icons', element: <AppIcon />, auth: authRoles.super },
  { path: '/material/progress', element: <AppProgress />, auth: authRoles.super },
  { path: '/material/menu', element: <AppMenu />, auth: authRoles.super },
  { path: '/material/checkbox', element: <AppCheckbox />, auth: authRoles.super },
  { path: '/material/switch', element: <AppSwitch />, auth: authRoles.super },
  { path: '/material/radio', element: <AppRadio />, auth: authRoles.super },
  { path: '/material/slider', element: <AppSlider />, auth: authRoles.super },
  { path: '/material/autocomplete', element: <AppAutoComplete />, auth: authRoles.super },
  { path: '/material/expansion-panel', element: <AppExpansionPanel />, auth: authRoles.super },
  { path: '/material/dialog', element: <AppDialog />, auth: authRoles.super },
  { path: '/material/snackbar', element: <AppSnackbar />, auth: authRoles.super }
];

export default materialRoutes;
