import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {AuthUser} from '@supabase/supabase-js';

import {supabaseUserIdKey} from '../../../../lib/constants/auth/supabase-user-id.constants';
import {PrismaService} from '../../../../lib/prisma/services/prisma.service';
import {UsersRepositoryService} from '../../../users/repositories/users-repository/users-repository.service';
import {CreateProjectDto} from '../../dto/CreateProject.dto';
import {UpdateProjectDto} from '../../dto/UpdateProject.dto';

@Injectable()
export class ProjectsRepositoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async create(
    currentUser: AuthUser,
    {
      clientId,
      name,
      subdomain,
      isBugReportsEnabled,
      isFeatureRequestsEnabled,
      isFeatureFeedbackEnabled,
    }: CreateProjectDto,
  ) {
    const user = await this.usersRepository.findBySupabaseId(
      currentUser[supabaseUserIdKey],
    );
    if (!user) {
      throw new InternalServerErrorException(
        `Could not find user with id: ${currentUser[supabaseUserIdKey]}`,
      );
    }
    const [createdProject, createdSubdomain] =
      await this.prismaService.$transaction(async (prisma) => {
        const createdProject = await prisma.project.create({
          data: {
            name,
            isBugReportsEnabled,
            isFeatureRequestsEnabled,
            isFeatureFeedbackEnabled,
            client: {
              connect: {
                id: clientId,
              },
            },
            createdBy: {
              connect: {
                id: user.id,
              },
            },
          },
          include: {
            createdBy: true,
            client: true,
            subdomains: true,
            hostnames: true,
          },
        });

        const createdSubdomain = await prisma.subdomain.create({
          data: {
            subdomain,
            project: {
              connect: {
                id: createdProject.id,
              },
            },
          },
        });

        return [createdProject, createdSubdomain];
      });
    return {
      ...createdProject,
      subdomains: [createdSubdomain],
    };
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
