import {inject} from '@angular/core';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {catchError, take, tap, throwError} from 'rxjs';

import {ClientDto} from '../../dtos/client/Client.dto';
import {PaymentPlanDto} from '../../dtos/payments/PaymentPlan.dto';
import {ClientService} from '../../services/client/client.service';
import {UserAuthenticationStore} from '../auth/user-auth.store';

export type ClientState = {
  isLoading: boolean;
  subdomain: string | null;
  customHostname: string | null;
  isSubdomainAvailable: boolean | null;
  currentlyCreatingClientId: string | null;
  currentlyCreatingClient: ClientDto | null;
};

const initialState: ClientState = {
  isLoading: false,
  subdomain: null,
  customHostname: null,
  isSubdomainAvailable: null,
  currentlyCreatingClientId: null,
  currentlyCreatingClient: null,
};

export const ClientStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store) => {
      const clientService = inject(ClientService);
      const userAuthenticationStore = inject(UserAuthenticationStore);
      return {
        resetIsSubdomainAvailable: () => {
          patchState(store, {isLoading: false, isSubdomainAvailable: null});
        },
        fetchCreatedClient: () => {
          patchState(store, {isLoading: true});
          clientService
              .fetchClientsWhereInvolved()
              .pipe(
                  take(1),
                  tap((clients) => {
                    const createdClient = clients.find(
                        (client) =>
                          client.createdBy.supabaseUserId ===
                  userAuthenticationStore.currentUserId(),
                    );
                    if (!createdClient) {
                      patchState(store, {
                        currentlyCreatingClientId: null,
                        isLoading: false,
                      });
                    } else {
                      patchState(store, {
                        currentlyCreatingClientId: createdClient.id,
                        currentlyCreatingClient: createdClient,
                        isSubdomainAvailable: true,
                        isLoading: false,
                      });
                    }
                  }),
              )
              .subscribe();
        },
        fetchIsSubdomainAvailable: (subdomain: string) => {
          patchState(store, {isLoading: true, isSubdomainAvailable: null});
          clientService
              .fetchIsSubdomainAvailable(subdomain)
              .pipe(
                  take(1),
                  tap((subdomainResponse) => {
                    patchState(store, {
                      isLoading: false,
                      isSubdomainAvailable: subdomainResponse.isSubdomainAvailable,
                    });
                  }),
                  catchError((err) => {
                    patchState(store, {isLoading: false});
                    return throwError(() => err);
                  }),
              )
              .subscribe();
        },
        registerNewClientAndProjectWithPlan: (
            subdomain: string,
            paymentPlan: PaymentPlanDto,
            isBugReportsEnabled: boolean,
            isFeatureRequestsEnabled: boolean,
            isFeatureFeedbackEnabled: boolean,
        ) => {
          patchState(store, {isLoading: true});
          clientService
              .registerNewClientAndProjectWithPlan(
                  subdomain,
                  paymentPlan,
                  isBugReportsEnabled,
                  isFeatureRequestsEnabled,
                  isFeatureFeedbackEnabled,
              )
              .pipe(
                  take(1),
                  tap((response) => {
                    patchState(store, {
                      isLoading: false,
                      currentlyCreatingClientId: response.clientId,
                    });
                    if (!response.isSuccessful) {
                      console.error(
                          `Failed to register new client and project with plan`,
                      );
                      return;
                    }
                  }),
                  catchError((err) => {
                    patchState(store, {isLoading: false});
                    return throwError(() => err);
                  }),
              )
              .subscribe();
        },
      };
    }),
);
