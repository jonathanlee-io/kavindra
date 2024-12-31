import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {AuthUser} from '@supabase/supabase-js';

import {supabaseUserIdKey} from '../../../../lib/constants/auth/supabase-user-id.constants';
import {reservedSubdomains} from '../../../../lib/constants/subdomains/reserved-subdomains.constants';
import {POSTSuccessDto} from '../../../../lib/dto/POSTSuccess.dto';
import {PaymentsService} from '../../../payments/services/payments/payments.service';
import {UsersRepositoryService} from '../../../users/repositories/users-repository/users-repository.service';
import {CreateClientDto} from '../../dto/CreateClient.dto';
import {IsSubdomainAvailableDto} from '../../dto/IsSubdomainAvailable.dto';
import {ClientsRepositoryService} from '../../repositories/clients-repository/clients-repository.service';

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientsRepository: ClientsRepositoryService,
    private readonly usersRepository: UsersRepositoryService,
    private readonly logger: Logger,
  ) {}

  async createClient(
    currentUser: AuthUser,
    {
      clientDisplayName,
      subdomain,
      isBugReportsEnabled,
      isFeatureRequestsEnabled,
      isFeatureFeedbackEnabled,
    }: CreateClientDto,
  ) {
    this.logger.log(
      `User with e-mail: <${currentUser.email}> attempting to create/update client with subdomain: ${subdomain}`,
    );
    if (
      !(await this.checkIfSubdomainAvailable({subdomain})).isSubdomainAvailable
    ) {
      throw new BadRequestException('Subdomain already exists');
    }
    const {createdClient, createdSubdomain, createdProject} =
      await this.clientsRepository.registerNewClientWithTransaction(
        currentUser,
        clientDisplayName,
        subdomain,
        PaymentsService.paymentPlans[0].id,
        {
          isBugReportsEnabled,
          isFeatureRequestsEnabled,
          isFeatureFeedbackEnabled,
        },
      );
    if (!createdClient || !createdSubdomain || !createdProject) {
      throw new InternalServerErrorException();
    }
    return <POSTSuccessDto & {clientId: string}>{
      isSuccessful: true,
      clientId: createdClient.id,
    };
  }

  async checkIfSubdomainAvailable(
    {subdomain}: IsSubdomainAvailableDto,
    currentUser?: AuthUser,
  ) {
    this.logger.log(
      `${currentUser ? `<${currentUser.email}> c` : 'C'}hecking if subdomain [ '${subdomain}' ] is available`,
    );
    return {
      isSubdomainAvailable: !(
        (await this.clientsRepository.isExistsSubdomain(subdomain)) ||
        reservedSubdomains.includes(subdomain)
      ),
      subdomain,
    };
  }

  async getClientById(currentUser: AuthUser, clientId: string) {
    const client = await this.clientsRepository.getClientById(clientId, {
      isIncludeAdmins: true,
      isIncludeMembers: true,
      isIncludeCreatedBy: true,
    });
    if (!client) {
      throw new NotFoundException(`Could not find client with id: ${clientId}`);
    }
    if (
      client.createdBy.supabaseUserId !== currentUser[supabaseUserIdKey] &&
      !client.members
        .map((member) => member.supabaseUserId)
        .includes(currentUser[supabaseUserIdKey]) &&
      !client.admins
        .map((admin) => admin.supabaseUserId)
        .includes(currentUser[supabaseUserIdKey])
    ) {
      throw new ForbiddenException();
    }
    return client;
  }

  async getClientsWhereInvolved(currentUser: AuthUser) {
    return this.clientsRepository.getClientsWhereUserInvolved(currentUser, {
      isIncludeCreatedBy: true,
      isIncludeMembers: true,
      isIncludeAdmins: true,
      isIncludeProjects: true,
    });
  }

  async removeMemberFromClientById(
    currentUser: AuthUser,
    clientId: string,
    emailToRemove: string,
  ) {
    const client = await this.getClientForModification(currentUser, clientId);
    if (!client.members.map((member) => member.email).includes(emailToRemove)) {
      throw new BadRequestException(
        `Could not find member with email: ${emailToRemove}`,
      );
    }
    return this.clientsRepository.removeMemberFromClientById(
      clientId,
      emailToRemove,
    );
  }

  async addMemberFromClientById(
    currentUser: AuthUser,
    clientId: string,
    emailToAdd: string,
  ) {
    const client = await this.getClientForModification(currentUser, clientId);
    if (client.members.map((member) => member.email).includes(emailToAdd)) {
      throw new BadRequestException(
        `Member with email: ${emailToAdd} already exists`,
      );
    }
    const userToAdd = await this.usersRepository.findByEmail(emailToAdd);
    if (!userToAdd) {
      throw new BadRequestException(
        `Could not find user with email: ${emailToAdd}`,
      );
    }
    return this.clientsRepository.addMemberToClientById(clientId, emailToAdd);
  }

  private async getClientForModification(
    currentUser: AuthUser,
    clientId: string,
  ) {
    const client = await this.clientsRepository.getClientById(clientId, {
      isIncludeAdmins: true,
      isIncludeMembers: true,
    });
    if (!client) {
      throw new NotFoundException(`Could not find client with id: ${clientId}`);
    }
    if (
      !client.admins.map((admin) => admin.email).includes(currentUser.email)
    ) {
      throw new ForbiddenException();
    }
    return client;
  }
}
