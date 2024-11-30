import {Injectable} from '@nestjs/common';
import {AuthUser} from '@supabase/supabase-js';

import {supabaseUserIdKey} from '../../../../lib/constants/auth/supabase-user-id.constants';
import {PrismaService} from '../../../../lib/prisma/services/prisma.service';
import {CreateProjectDto} from '../../dto/CreateProject.dto';

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
    return this.prismaService.client.findMany({
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
  }
}
