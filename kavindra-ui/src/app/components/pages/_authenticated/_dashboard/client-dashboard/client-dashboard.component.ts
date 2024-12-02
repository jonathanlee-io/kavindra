import {NgIf} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';

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
export class ClientDashboardComponent implements OnInit {
  protected readonly projectStore = inject(ProjectStore);
  protected readonly rebaseRoutePathAsString = rebaseRoutePathAsString;
  protected readonly RoutePath = RoutePath;

  ngOnInit() {
    this.projectStore.loadProjectsWhereInvolved();
  }
}
