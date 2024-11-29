import {Routes} from '@angular/router';

import {
  CreateClientIntroPageComponent,
} from './components/pages/_authenticated/_create_client_pages/create-client-intro-page/create-client-intro-page.component';
import {
  CreateProjectPageComponent,
} from './components/pages/_authenticated/_create_client_pages/create-project-page/create-project-page.component';
import {
  MainDashboardComponent,
} from './components/pages/_authenticated/_dashboard/main-dashboard/main-dashboard.component';
import {
  SettingsPageComponent,
} from './components/pages/_authenticated/_manage_settings_pages/settings-page/settings-page.component';
import {LoginPageComponent} from './components/pages/_login_register_pages/login-page/login-page.component';
import {RegisterPageComponent} from './components/pages/_login_register_pages/register-page/register-page.component';
import {LandingPageComponent} from './components/pages/landing-page/landing-page.component';
import {LoginSuccessComponent} from './components/pages/login-success/login-success.component';
import {authGuard} from './guards/auth.guard';
import {reverseAuthGuard} from './guards/reverse-auth.guard';

export enum RoutePath {
  /* ANONYMOUS ROUTES */
  LANDING_PAGE = '',
  LOGIN = 'login',
  REGISTER = 'register',
  /* ERROR ROUTES */
  ERROR_NOT_FOUND = 'error/not-found',
  /* TRANSITION ROUTES */
  LOGIN_SUCCESS = 'login-success',
  /* AUTHENTICATED ROUTES */
  CREATE_CLIENT_INTRO = 'create/client/intro',
  CREATE_PROJECT = 'create/project',
  SETTINGS_PAGE = 'manage/settings',
  DASHBOARD = 'dashboard',
}

export const routes: Routes = [
  /* ANONYMOUS ROUTES */
  {
    path: RoutePath.LANDING_PAGE,
    component: LandingPageComponent,
    canActivate: [reverseAuthGuard],
  },
  {
    path: RoutePath.LOGIN,
    component: LoginPageComponent,
    canActivate: [reverseAuthGuard],
  },
  {
    path: RoutePath.REGISTER,
    component: RegisterPageComponent,
    canActivate: [reverseAuthGuard],
  },
  /* TRANSITION ROUTES */
  {
    path: RoutePath.LOGIN_SUCCESS,
    component: LoginSuccessComponent,
  },
  /* AUTHENTICATED ROUTES */
  {
    path: RoutePath.CREATE_CLIENT_INTRO,
    component: CreateClientIntroPageComponent,
    canActivate: [authGuard],
  },
  {
    path: RoutePath.CREATE_PROJECT,
    component: CreateProjectPageComponent,
    canActivate: [authGuard],
  },
  {
    path: RoutePath.SETTINGS_PAGE,
    component: SettingsPageComponent,
    canActivate: [authGuard],
  },
  {
    path: RoutePath.DASHBOARD,
    component: MainDashboardComponent,
    canActivate: [authGuard],
  },
];
