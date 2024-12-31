import { Controller, Get } from '@nestjs/common';
import { ProjectsServiceService } from './projects-service.service';

@Controller()
export class ProjectsServiceController {
  constructor(private readonly projectsServiceService: ProjectsServiceService) {}

  @Get()
  getHello(): string {
    return this.projectsServiceService.getHello();
  }
}
