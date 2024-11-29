import {Injectable, Logger} from '@nestjs/common';
import {AuthUser} from '@supabase/supabase-js';

import {ClientsService} from '../../../clients/services/clients/clients.service';
import {CreateProjectDto} from '../../dto/CreateProject.dto';
import {ProjectsRepositoryService} from '../../repositories/projects-repository/projects-repository.service';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly logger: Logger,
    private readonly projectsRepository: ProjectsRepositoryService,
    private readonly clientsService: ClientsService,
  ) {}

  async createProject(
    currentUser: AuthUser,
    createProjectDto: CreateProjectDto,
  ) {
    const client = await this.clientsService.getClientById(
      currentUser,
      createProjectDto.clientId,
    );
    this.logger.log(
      `Attempting to create project with name: ${createProjectDto.name} for client with ID: ${client.id}}`,
    );
    return this.projectsRepository.create(currentUser, createProjectDto);
  }

  async getProjectsWhereInvolved(currentUser: AuthUser) {
    return this.projectsRepository.getProjectsWhereInvolved(currentUser);
  }
}
