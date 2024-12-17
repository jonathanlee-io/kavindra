import {Routes} from '@nestjs/core';

import {ClientsModule} from './clients/clients.module';
import {EmbedScriptsModule} from './embed-scripts/embed-scripts.module';
import {EpicsModule} from './epics/epics.module';
import {IssuesModule} from './issues/issues.module';
import {PaymentsModule} from './payments/payments.module';
import {ProjectsModule} from './projects/projects.module';
import {ReleasesModule} from './releases/releases.module';
import {SprintsModule} from './sprints/sprints.module';
import {UsersModule} from './users/users.module';

export const routes: Routes = [
  {
    path: '',
    module: EmbedScriptsModule,
  },
  {
    path: 'users',
    module: UsersModule,
  },
  {
    path: 'clients',
    module: ClientsModule,
  },
  {
    path: 'issues',
    module: IssuesModule,
  },
  {
    path: 'epics',
    module: EpicsModule,
  },
  {
    path: 'releases',
    module: ReleasesModule,
  },
  {
    path: 'sprints',
    module: SprintsModule,
  },
  {
    path: 'projects',
    module: ProjectsModule,
  },
  {
    path: 'payments',
    module: PaymentsModule,
  },
];
