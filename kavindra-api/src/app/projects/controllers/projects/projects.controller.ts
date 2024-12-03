import {CacheInterceptor, CacheTTL} from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Header,
  HostParam,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {AuthUser} from '@supabase/supabase-js';

import {CurrentUser} from '../../../../lib/auth/supabase/decorators/current-user.decorator';
import {Public} from '../../../../lib/auth/supabase/decorators/is-public.decorator';
import {host} from '../../../../lib/config/host.config';
import {oneDayInMilliseconds} from '../../../../lib/constants/time/time.constants';
import {ClientParamDto} from '../../../../lib/dto/ClientParam.dto';
import {IdParamDto} from '../../../../lib/validation/id.param.dto';
import {CreateProjectDto} from '../../dto/CreateProject.dto';
import {UpdateProjectDto} from '../../dto/UpdateProject.dto';
import {ProjectsService} from '../../services/projects/projects.service';

@Controller({host})
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Public()
  @Get('feedback-widget-script.js')
  @Header('Content-Type', 'text/javascript')
  async getFeedbackWidgetScript(
    @HostParam() {client: clientSubdomain}: ClientParamDto,
  ) {
    return this.projectsService.getFeedbackWidgetScript(clientSubdomain);
  }

  @Public()
  @Get('widget.js')
  @Header('Content-Type', 'text/javascript')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(oneDayInMilliseconds)
  async getWidgetScript() {
    return this.projectsService.getWidgetScript();
  }

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
}
