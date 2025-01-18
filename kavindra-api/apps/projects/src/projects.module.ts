import {PrismaModule} from '@app/prisma';
import {Logger, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {ProjectsController} from './controllers/projects/projects.controller';
import {ProjectsRepositoryService} from './repositories/projects-repository/projects-repository.service';
import {ProjectsService} from './services/projects/projects.service';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [ProjectsController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(ProjectsModule.name),
    },
    ProjectsService,
    ProjectsRepositoryService,
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
