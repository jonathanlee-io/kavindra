import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthUser} from '@supabase/supabase-js';

import {CurrentUser} from '../../../../lib/auth/supabase/decorators/current-user.decorator';
import {host} from '../../../../lib/config/host.config';
import {CreateClientDto} from '../../dto/CreateClient.dto';
import {IsSubdomainAvailableDto} from '../../dto/IsSubdomainAvailable.dto';
import {ClientsService} from '../../services/clients/clients.service';

@ApiTags('Clients')
@Controller({host})
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('create')
  async registerNewClient(
    @CurrentUser() currentUser: AuthUser,
    @Body() createClientDto: CreateClientDto,
  ) {
    return this.clientsService.createClient(currentUser, createClientDto);
  }

  @Post('is-subdomain-available')
  @HttpCode(HttpStatus.OK)
  async isSubdomainAvailable(
    @Body() isSubdomainAvailableDto: IsSubdomainAvailableDto,
  ) {
    return this.clientsService.checkIfSubdomainAvailable(
      isSubdomainAvailableDto,
    );
  }

  @Get('where-involved')
  async getClientsWhereInvolved(@CurrentUser() currentUser: AuthUser) {
    return this.clientsService.getClientsWhereInvolved(currentUser);
  }
}
