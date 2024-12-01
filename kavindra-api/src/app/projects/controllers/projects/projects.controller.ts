import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {AuthUser} from '@supabase/supabase-js';

import {CurrentUser} from '../../../../lib/auth/supabase/decorators/current-user.decorator';
import {host} from '../../../../lib/config/host.config';
import {IdParamDto} from '../../../../lib/validation/id.param.dto';
import {CreateProjectDto} from '../../dto/CreateProject.dto';
import {UpdateProjectDto} from '../../dto/UpdateProject.dto';
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

  @Get('where-involved')
  async getProjectsWhereInvolved(@CurrentUser() currentUser: AuthUser) {
    return this.projectsService.getProjectsWhereInvolved(currentUser);
  }

  @Get(':id')
  async getProjectById(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    return this.projectsService.getProjectById(currentUser, id);
  }

  @Put(':id')
  async updateProjectById(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id}: IdParamDto,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.updateProjectById(
      currentUser,
      id,
      updateProjectDto,
    );
  }
}
