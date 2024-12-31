import {Routes} from '@nestjs/core';

import {ClientsModule} from './clients/clients.module';
import {EmbedScriptsModule} from './embed-scripts/embed-scripts.module';
import {IssuesModule} from './issues/issues.module';
import {PaymentsModule} from './payments/payments.module';
import {ProjectsModule} from './projects/projects.module';
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
    path: 'projects',
    module: ProjectsModule,
  },
  {
    path: 'payments',
    module: PaymentsModule,
  },
];