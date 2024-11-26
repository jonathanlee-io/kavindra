import {Body, Controller, Post} from '@nestjs/common';
import {AuthUser} from '@supabase/supabase-js';

import {CurrentUser} from '../../../../lib/auth/supabase/decorators/current-user.decorator';
import {host} from '../../../../lib/config/host.config';
import {CreateProjectDto} from '../../dto/CreateProject.dto';
import {ProjectsService} from '../../services/projects/projects.service';

@Controller({host})
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  async registerNewProject(
    @CurrentUser() currentUser: AuthUser,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.createProject(currentUser, createProjectDto);
  }
}
