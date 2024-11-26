import { Routes } from '@angular/router';

import { ReviewPlanPageComponent } from './components/pages/_authenticated/_setup-page/review-plan-page/review-plan-page.component';
import { SetupPageComponent } from './components/pages/_authenticated/_setup-page/setup-page/setup-page.component';
import { BacklogPageComponent } from './components/pages/_authenticated/backlog-page/backlog-page.component';
import { HomePageComponent } from './components/pages/_authenticated/home-page/home-page.component';
import { SchedulePageComponent } from './components/pages/_authenticated/schedule-page/schedule-page.component';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { LoginSuccessComponent } from './components/pages/login-success/login-success.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { authGuard } from './guards/auth.guard';
import { reverseAuthGuard } from './guards/reverse-auth.guard';

export enum RoutePath {
  /* ANONYMOUS ROUTES */
  LANDING_PAGE = '',
  LOGIN = 'login',
  REGISTER = 'register',
  /* ERROR ROUTES */
  ERROR_NOT_FOUND = 'error/not-found',
  /* AUTHENTICATED ROUTES */
  LOGIN_SUCCESS = 'login-success',
  SETUP = 'setup/client',
  REVIEW_PAYMENT_PLAN = 'setup/review-payment-plan',
  BOARD = 'board',
  SCHEDULE = 'schedule',
  BACKLOG = 'backlog',
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
  /* AUTHENTICATED ROUTES */
  {
    path: RoutePath.LOGIN_SUCCESS,
    component: LoginSuccessComponent,
  },
  {
    path: RoutePath.SETUP,
    component: SetupPageComponent,
    canActivate: [authGuard],
  },
  {
    path: RoutePath.REVIEW_PAYMENT_PLAN,
    component: ReviewPlanPageComponent,
    canActivate: [authGuard],
  },
  {
    path: RoutePath.BOARD,
    component: HomePageComponent,
    canActivate: [authGuard],
  },
  {
    path: RoutePath.SCHEDULE,
    component: SchedulePageComponent,
    canActivate: [authGuard],
  },
  {
    path: RoutePath.BACKLOG,
    component: BacklogPageComponent,
    canActivate: [authGuard],
  },
];

export const rebaseRoutePath = (routePath: RoutePath) => `/${routePath}`;
export const rebaseRoutePathWithClientId = (
  routePath: RoutePath,
  clientId: string | undefined,
) => `/${routePath.replace(routePathParameters.CLIENT_ID, clientId ?? '')}`;
export const rebaseRoutePathAsString = (routePathAsString: string) =>
  `/${routePathAsString}`;

export const routePathParameters = {
  CLIENT_ID: ':clientId',
} as const;
