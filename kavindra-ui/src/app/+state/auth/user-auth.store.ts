import { DOCUMENT } from '@angular/common';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';

import {  RoutePath } from '../../app.routes';
import { AuthService } from '../../services/auth/auth.service';
import { SupabaseService } from '../../services/supabase/supabase.service';
import {rebaseRoutePath, RouterUtils} from '../../util/router/Router.utils';
import { NotificationsStore } from '../notifications/notifications.store';

export type LoggedInState = 'INIT' | 'NOT_LOGGED_IN' | 'LOADING' | 'LOGGED_IN';

export type UserAuthenticationState = {
  loggedInState: LoggedInState;
  isDarkMode: boolean;
};

const initialState: UserAuthenticationState = {
  loggedInState: 'INIT',
  isDarkMode: false,
};

export const UserAuthenticationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const authService = inject(AuthService);
    return {
      userCheckIn: () => {
        if (store.loggedInState() === 'LOGGED_IN') {
          authService.checkIn().pipe(take(1)).subscribe();
        }
      },
    };
  }),
  withMethods((store) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const notificationsStore = inject(NotificationsStore);
    const supabaseService = inject(SupabaseService);
    const pageDocument = inject(DOCUMENT);
    return {
      toggleDarkMode: () => {
        const element = pageDocument.querySelector('html');
        if (!element) {
          return;
        }
        element.classList.toggle('dark');
        patchState(store, { isDarkMode: !store.isDarkMode() });
      },
      onLoginComplete: async () => {
        const next = authService.getNextParamFromLocalStorageAndNoReset();
        if (next) {
          router
            .navigateByUrl(next)
            .catch(RouterUtils.navigateCatchErrorCallback);
        }
        localStorage.setItem(
          'supabase-session',
          JSON.stringify(supabaseService.session),
        );
        patchState(store, { loggedInState: 'LOGGED_IN' });
        store.userCheckIn();
      },
      logout: async () => {
        patchState(store, { loggedInState: 'LOADING' });
        await supabaseService.signOut();
        authService.setNextParamInLocalStorageIfNotAnonymous(null);
        authService.redirectIfNotAnonymous();
        patchState(store, { ...initialState });
        router
          .navigate([rebaseRoutePath(RoutePath.LOGIN)])
          .catch(RouterUtils.navigateCatchErrorCallback);
        notificationsStore.unloadNotifications();
      },
    };
  }),
  withMethods((store) => {
    const messageService = inject(MessageService);
    return {
      onLoginError: (error: Error) => {
        console.error(error);
        messageService.add({
          severity: 'error',
          summary: 'Login Error',
          detail: 'Invalid login credentials',
          sticky: false,
          life: 5_000,
          closable: true,
        });
        store.logout().catch((reason) => console.error(reason));
      },
    };
  }),
  withMethods((store) => {
    const authService = inject(AuthService);
    const supabaseService = inject(SupabaseService);
    return {
      attemptSupabaseLoginWithGoogle: async () => {
        patchState(store, { loggedInState: 'LOADING' });
        setTimeout(async () => {
          const { error } = await supabaseService.signInWithGoogle();
          if (error) {
            store.onLoginError(error);
          } else {
            store.onLoginComplete();
          }
        }, 2500);
      },
      attemptSupabaseLoginWithGitHub: async () => {
        patchState(store, { loggedInState: 'LOADING' });
        const { error } = await supabaseService.signInWithGitHub();
        if (error) {
          store.onLoginError(error);
        }
      },
      checkLoginOnRefresh: () => {
        supabaseService.session = JSON.parse(
          localStorage.getItem('supabase-session') ?? JSON.stringify(null),
        );
        console.log(supabaseService.session);
        if (supabaseService.session !== null) {
          patchState(store, { loggedInState: 'LOGGED_IN' });
        }
      },
      onLoginPageVisitedWithNext: (next: string) => {
        authService.setNextParamInLocalStorageIfNotAnonymous(next);
      },
    };
  }),
  withComputed((store) => {
    const supabaseService = inject(SupabaseService);
    return {
      currentUserEmail: computed(() => supabaseService?.session?.user.email),
      currentUserId: computed(() => supabaseService?.session?.user.id),
      isLoggedIn: computed(() => store.loggedInState() === 'LOGGED_IN'),
      isLoading: computed(() => store.loggedInState() === 'LOADING'),
    };
  }),
);
