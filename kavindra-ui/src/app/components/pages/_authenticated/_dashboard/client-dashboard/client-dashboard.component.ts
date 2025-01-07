import {NgIf} from '@angular/common';
import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {Subscription, tap} from 'rxjs';

import {UserAuthenticationStore} from '../../../../../+state/auth/user-auth.store';
import {ClientStore} from '../../../../../+state/client/client.store';
import {ProjectStore} from '../../../../../+state/project/project.store';
import {RoutePath} from '../../../../../app.routes';
import {rebaseRoutePathAsString} from '../../../../../util/router/Router.utils';

@Component({
  selector: 'app-client-dashboard',
  imports: [
    ButtonModule,
    NgIf,
    ProgressSpinnerModule,
    TableModule,
    TagModule,
    RouterLink,
  ],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss',
})
export class ClientDashboardComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);

  protected readonly projectStore = inject(ProjectStore);
  protected readonly clientStore = inject(ClientStore);
  private readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly rebaseRoutePathAsString = rebaseRoutePathAsString;
  protected readonly RoutePath = RoutePath;

  private routeParamsSubscription?: Subscription;
  protected readonly clientId = signal<string>('');

  ngOnInit() {
    this.routeParamsSubscription = this.route.params.pipe(
        tap((params) => {
          const {clientId} = params;
          this.clientId.set(clientId);
          this.loadProjectsForClient(clientId);
        }),
    ).subscribe();
  }

  ngOnDestroy() {
    this.routeParamsSubscription?.unsubscribe();
  }

  loadProjectsForClient(clientId: string) {
    this.projectStore.loadProjectsForClient(clientId);
    this.clientStore.fetchClientById(clientId);
  }

  isCurrentUserAdmin() {
    return this.clientStore.clientById()?.
        admins.map((admin) => admin.email)
        .includes(this.userAuthenticationStore.currentUserEmail() ?? '');
  }

  isUserAdmin(email: string) {
    return this.clientStore.clientById()?.
        admins.map((admin) => admin.email)
        .includes(email);
  }
}
