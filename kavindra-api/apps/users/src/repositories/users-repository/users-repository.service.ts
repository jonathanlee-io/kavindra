import {Injectable} from '@nestjs/common';

import {PrismaService} from '../../../../lib/prisma/services/prisma.service';

@Injectable()
export class UsersRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findBySupabaseId(supabaseId: string) {
    return this.prismaService.user.findFirst({
      where: {supabaseUserId: supabaseId},
    });
  }

  async createUserFromAuthUser(
    requestingUserSubjectId: string,
    requestingUserEmail: string,
  ) {
    return this.prismaService.user.create({
      data: {
        email: requestingUserEmail,
        displayName: requestingUserEmail,
        supabaseUserId: requestingUserSubjectId,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {email},
    });
  }
}
