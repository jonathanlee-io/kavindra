import {Injectable, Logger} from '@nestjs/common';
import {AuthUser} from '@supabase/supabase-js';

import {supabaseUserIdKey} from '../../../../lib/constants/auth/supabase-user-id.constants';
import {POSTSuccessDto} from '../../../../lib/dto/POSTSuccess.dto';
import {UsersRepositoryService} from '../../repositories/users-repository/users-repository.service';

@Injectable()
export class AuthenticatedUsersService {
  constructor(
    private readonly logger: Logger,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async checkIn(
    currentUser: AuthUser,
  ): Promise<POSTSuccessDto & {isCreatedNew: boolean}> {
    const existingUser = await this.usersRepository.findBySupabaseId(
      currentUser[supabaseUserIdKey],
    );
    if (existingUser) {
      return {isSuccessful: true, isCreatedNew: false};
    }
    this.logger.log(`Creating new user for <${currentUser.email}>`);
    await this.usersRepository.createUserFromAuthUser(currentUser);
    return {isSuccessful: true, isCreatedNew: true};
  }
}
