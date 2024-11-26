import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import flagsmith from 'flagsmith';
import { filter, tap } from 'rxjs';

import { environment } from '../environments/environment';
import { UserAuthenticationStore } from './+state/auth/user-auth.store';
import { FeatureFlagsStore } from './+state/feature-flags/feature-flags.store';
import { UserPreferencesStore } from './+state/user-preferences/user-preferences.store';
import { FeatureFlagEnum } from './enums/FeatureFlag.enum';
import { AuthService } from './services/auth/auth.service';
import { SupabaseService } from './services/supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private static readonly REFRESH_EVENT_ID = 1;

  private readonly userAuthenticationStore = inject(UserAuthenticationStore);
  private readonly userPreferencesStore = inject(UserPreferencesStore);
  private readonly featureFlagsStore = inject(FeatureFlagsStore);
  private readonly supabaseService = inject(SupabaseService);
  private readonly authService = inject(AuthService);

  pipeAuthAndDarkModeToggleRouterEvents(router: Router) {
    router.events
      .pipe(
        tap(() => {
          if (
            this.authService.getDarkModeSettingFromLocalStorage() &&
            !this.userPreferencesStore.isDarkMode()
          ) {
            this.userPreferencesStore.setDarkModeEnabled();
          } else if (
            !this.authService.getDarkModeSettingFromLocalStorage() &&
            this.userPreferencesStore.isDarkMode()
          ) {
            this.userPreferencesStore.setLightModeEnabled();
          }
        }),
        filter(
          (routerEvent): routerEvent is NavigationEnd =>
            routerEvent instanceof NavigationEnd,
        ),
        filter((event) => event.id === AppService.REFRESH_EVENT_ID),
        tap(() => {
          this.userAuthenticationStore.checkLoginOnRefresh();
        }),
        filter(() => this.userAuthenticationStore.isLoggedIn()),
        tap(() => {
          // this.notificationsStore.loadNotifications();
          // this.paymentStore.loadPaymentStatus();
        }),
      )
      .subscribe();
  }

  pipeNextParamAuthEvents(router: Router) {
    router.events
      .pipe(
        filter(
          (routerEvent): routerEvent is NavigationEnd =>
            routerEvent instanceof NavigationEnd,
        ),
        tap((event) => {
          this.authService.setNextParamInLocalStorageIfNotAnonymous(event.url);
        }),
      )
      .subscribe();
  }

  initSupabase() {
    this.supabaseService.authChanges((event, session) => {
      if (!session) {
        const supabaseSession = JSON.parse(
          localStorage.getItem('supabase-session') as string,
        );
        if (supabaseSession) {
          this.supabaseService.session = supabaseSession;
        }
      }
      if (event === 'SIGNED_IN') {
        this.supabaseService.session = session;
        this.userAuthenticationStore
          .onLoginComplete()
          .catch((reason) => console.error(reason));
      }
    });
  }

  initFeatureFlags() {
    this.featureFlagsStore.onFeatureFlagsInit();
    flagsmith
      .init({
        environmentID: environment.FLAGSMITH_CLIENT_SDK_KEY,
        api: environment.FLAGSMITH_API_URL,
        onChange: () => {
          this.featureFlagsStore.onFeatureFlagsLoaded([
            ...Object.values(FeatureFlagEnum).map((flag) => ({
              featureName: flag,
              isActive: flagsmith.hasFeature(flag),
            })),
          ]);
        },
      })
      .catch((reason) => console.error(reason));
  }
}
