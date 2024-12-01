import {Injectable} from '@nestjs/common';
import {AuthUser} from '@supabase/supabase-js';

import {supabaseUserIdKey} from '../../../../lib/constants/auth/supabase-user-id.constants';
import {PrismaService} from '../../../../lib/prisma/services/prisma.service';
import {CreateProjectDto} from '../../dto/CreateProject.dto';
import {UpdateProjectDto} from '../../dto/UpdateProject.dto';

@Injectable()
export class ProjectsRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(currentUser: AuthUser, createProjectDto: CreateProjectDto) {
    return this.prismaService.project.create({
      data: {
        name: createProjectDto.name,
        client: {
          connect: {
            id: createProjectDto.clientId,
          },
        },
        createdBy: {
          connect: {
            supabaseUserId: currentUser[supabaseUserIdKey],
          },
        },
      },
    });
  }

  async getProjectsWhereInvolved(currentUser: AuthUser) {
    const clientsWhereInvolved = await this.prismaService.client.findMany({
      where: {
        OR: [
          {
            members: {
              some: {
                supabaseUserId: currentUser[supabaseUserIdKey],
              },
            },
          },
          {
            admins: {
              some: {
                supabaseUserId: currentUser[supabaseUserIdKey],
              },
            },
          },
        ],
      },
      include: {
        createdBy: true,
        members: true,
        admins: true,
        projects: true,
      },
    });

    return this.prismaService.project.findMany({
      where: {
        clientId: {in: clientsWhereInvolved.map((client) => client.id)},
      },
      include: {
        createdBy: true,
        client: true,
        hostnames: true,
        subdomains: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findById(projectId: string) {
    return this.prismaService.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        createdBy: true,
        client: true,
        hostnames: true,
        subdomains: true,
      },
    });
  }

  async updateProjectById(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ) {
    return this.prismaService.project.update({
      where: {
        id: projectId,
      },
      data: {
        isBugReportsEnabled: updateProjectDto.isBugReportsEnabled,
        isFeatureRequestsEnabled: updateProjectDto.isFeatureRequestsEnabled,
        isFeatureFeedbackEnabled: updateProjectDto.isFeatureFeedbackEnabled,
      },
      include: {
        createdBy: true,
        client: true,
        hostnames: true,
        subdomains: true,
      },
    });
  }
}
