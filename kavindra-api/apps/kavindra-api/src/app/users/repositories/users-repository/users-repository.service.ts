import {Injectable} from '@nestjs/common';
import {AuthUser} from '@supabase/supabase-js';

import {PrismaService} from '../../../../lib/prisma/services/prisma.service';

@Injectable()
export class UsersRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findBySupabaseId(supabaseId: string) {
    return this.prismaService.user.findFirst({
      where: {supabaseUserId: supabaseId},
    });
  }

  async createUserFromAuthUser(user: AuthUser) {
    return this.prismaService.user.create({
      data: {
        email: user.email,
        displayName: user.user_metadata['name'] ?? '',
        supabaseUserId: user['sub'],
      },
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {email},
    });
  }
}
