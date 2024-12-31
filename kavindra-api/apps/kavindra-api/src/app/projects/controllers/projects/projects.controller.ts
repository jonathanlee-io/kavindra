import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Get('for-client/:id')
  async getProjectsForClient(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id: clientId}: IdParamDto,
  ) {
    return this.projectsService.getProjectsForClient(currentUser, clientId);
  }

  @Get(':id')
  async getProjectById(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id: projectId}: IdParamDto,
  ) {
    return this.projectsService.getProjectById(currentUser, projectId);
  }

  @Put(':id')
  async updateProjectById(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id: projectId}: IdParamDto,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.updateProjectById(
      currentUser,
      projectId,
      updateProjectDto,
    );
  }

  @Post('for-client/:id')
  async createProjectForClient(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id: clientId}: IdParamDto,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    if (clientId !== createProjectDto.clientId) {
      throw new BadRequestException('Client ID in URL does not match body');
    }
    return this.projectsService.createProject(currentUser, createProjectDto);
  }
}
