import { Module } from '@nestjs/common';
import { ProjectsServiceController } from './projects-service.controller';
import { ProjectsServiceService } from './projects-service.service';

@Module({
  imports: [],
  controllers: [ProjectsServiceController],
  providers: [ProjectsServiceService],
})
export class ProjectsServiceModule {}
