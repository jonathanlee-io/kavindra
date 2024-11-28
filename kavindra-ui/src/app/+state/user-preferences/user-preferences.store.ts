import {inject} from '@angular/core';
import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';

import {AuthService} from '../../services/auth/auth.service';

export type UserPreferencesState = {
  isDarkMode: boolean;
  isSidebarOpen: boolean;
};

const initialState: UserPreferencesState = {
  isDarkMode: false,
  isSidebarOpen: true,
};

export const UserPreferencesStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store) => {
      const authService = inject(AuthService);
      const document = inject(Document);
      return {
        setIsSidebarOpen: (isSidebarOpen: boolean) => {
          patchState(store, {isSidebarOpen});
        },
        setDarkModeEnabled: () => {
          const rootElement = document.getElementById('root')! as unknown as HTMLElement;
          rootElement.classList.add('dark');
          authService.setDarkModeSettingInLocalStorage(true);
          patchState(store, {isDarkMode: true});
        },
        setLightModeEnabled: () => {
          const rootElement = document.getElementById('root')! as unknown as HTMLElement;
          rootElement.classList.remove('dark');
          authService.setDarkModeSettingInLocalStorage(false);
          patchState(store, {isDarkMode: false});
        },
      };
    }),
    withHooks({
      onInit: (store) => {
        if (
          !localStorage.getItem(AuthService.darkModeKey) &&
        window?.matchMedia('(prefers-color-scheme: dark)')?.matches
        ) {
          store.setDarkModeEnabled();
        } else if (
          JSON.parse(localStorage.getItem(AuthService.darkModeKey) ?? 'false')
        ) {
          store.setDarkModeEnabled();
        } else {
          store.setLightModeEnabled();
        }
      },
    }),
);
