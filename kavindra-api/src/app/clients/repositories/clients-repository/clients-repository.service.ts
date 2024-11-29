import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {AuthUser} from '@supabase/supabase-js';

import {supabaseUserIdKey} from '../../../../lib/constants/auth/supabase-user-id.constants';
import {PrismaService} from '../../../../lib/prisma/services/prisma.service';
import {UsersRepositoryService} from '../../../users/repositories/users-repository/users-repository.service';

@Injectable()
export class ClientsRepositoryService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async registerNewClientWithTransaction(
    currentUser: AuthUser,
    subdomain: string,
    paymentPlanId: string,
    {
      isBugReportsEnabled,
      isFeatureRequestsEnabled,
      isFeatureFeedbackEnabled,
    }: {
      isBugReportsEnabled: boolean;
      isFeatureRequestsEnabled: boolean;
      isFeatureFeedbackEnabled: boolean;
    },
  ) {
    const user = await this.usersRepository.findBySupabaseId(
      currentUser[supabaseUserIdKey],
    );
    if (!user) {
      throw new InternalServerErrorException(
        `Could not find user with id: ${currentUser[supabaseUserIdKey]}`,
      );
    }
    let createdClient: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
    };
    try {
      createdClient = await this.prismaService.client.create({
        data: {
          displayName: subdomain,
          paymentPlan: {
            connect: {
              id: paymentPlanId,
            },
          },
          createdBy: {
            connect: {
              id: user.id,
            },
          },
          admins: {
            connect: {
              supabaseUserId: currentUser[supabaseUserIdKey],
            },
          },
          members: {
            connect: {
              supabaseUserId: currentUser[supabaseUserIdKey],
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
    if (!createdClient) {
      throw new InternalServerErrorException();
    }
    const [createdSubdomain, createdProject] =
      await this.prismaService.$transaction([
        this.prismaService.subdomain.create({
          data: {
            client: {connect: {id: createdClient.id}},
            subdomain,
          },
        }),
        this.prismaService.project.create({
          data: {
            name: subdomain,
            isBugReportsEnabled,
            isFeatureRequestsEnabled,
            isFeatureFeedbackEnabled,
            client: {
              connect: {
                id: createdClient.id,
              },
            },
            createdBy: {
              connect: {
                id: user.id,
              },
            },
          },
        }),
      ]);

    return {createdClient, createdSubdomain, createdProject};
  }

  async isExistsSubdomain(subdomain: string) {
    const existingSubdomain = await this.prismaService.subdomain.findUnique({
      where: {subdomain},
    });
    return existingSubdomain !== null && existingSubdomain !== undefined;
  }

  async getClientsWhereUserInvolved(
    currentUser: AuthUser,
    {
      isIncludeCreatedBy,
      isIncludeSubdomains,
      isIncludeHostnames,
      isIncludeMembers,
      isIncludeAdmins,
      isIncludeProjects,
    }: {
      isIncludeCreatedBy?: boolean;
      isIncludeSubdomains?: boolean;
      isIncludeHostnames?: boolean;
      isIncludeMembers?: boolean;
      isIncludeAdmins?: boolean;
      isIncludeProjects?: boolean;
    },
  ) {
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
        createdBy: isIncludeCreatedBy,
        subdomains: isIncludeSubdomains,
        hostnames: isIncludeHostnames,
        members: isIncludeMembers,
        admins: isIncludeAdmins,
        projects: isIncludeProjects,
      },
    });
  }

  async getClientById(
    clientId: string,
    {
      isIncludeCreatedBy,
      isIncludeSubdomains,
      isIncludeHostnames,
      isIncludeMembers,
      isIncludeAdmins,
    }: {
      isIncludeCreatedBy?: boolean;
      isIncludeSubdomains?: boolean;
      isIncludeHostnames?: boolean;
      isIncludeMembers?: boolean;
      isIncludeAdmins?: boolean;
    },
  ) {
    return this.prismaService.client.findUnique({
      where: {id: clientId},
      include: {
        createdBy: isIncludeCreatedBy,
        admins: isIncludeAdmins,
        members: isIncludeMembers,
        subdomains: isIncludeSubdomains,
        hostnames: isIncludeHostnames,
      },
    });
  }

  async updatePaymentPlanForClientById(
    currentUser: AuthUser,
    id: string | undefined,
    paymentPlanId: string,
  ) {
    if (!id) {
      throw new InternalServerErrorException();
    }
    const client = await this.prismaService.client.findUnique({
      where: {
        id,
      },
      include: {
        createdBy: true,
      },
    });
    if (client.createdBy.supabaseUserId !== currentUser[supabaseUserIdKey]) {
      throw new ForbiddenException();
    }
    await this.prismaService.client.update({
      where: {
        id,
      },
      data: {
        paymentPlan: {
          connect: {
            id: paymentPlanId,
          },
        },
      },
    });
  }
}
