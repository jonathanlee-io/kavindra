import {Routes} from '@angular/router';

import {LoginPageComponent} from './components/pages/_login_register_pages/login-page/login-page.component';
import {RegisterPageComponent} from './components/pages/_login_register_pages/register-page/register-page.component';
import {LandingPageComponent} from './components/pages/landing-page/landing-page.component';
import {LoginSuccessComponent} from './components/pages/login-success/login-success.component';
import {reverseAuthGuard} from './guards/reverse-auth.guard';

export enum RoutePath {
  /* ANONYMOUS ROUTES */
  LANDING_PAGE = '',
  LOGIN = 'login',
  REGISTER = 'register',
  /* ERROR ROUTES */
  ERROR_NOT_FOUND = 'error/not-found',
  /* AUTHENTICATED ROUTES */
  LOGIN_SUCCESS = 'login-success',
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
];
