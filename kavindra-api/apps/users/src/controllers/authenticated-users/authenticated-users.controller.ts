import {ApiGatewayRequestHeaders, ApiGatewayRequestHeadersDto} from '@app/auth';
import {Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

import {AuthenticatedUsersService} from '../../services/authenticated-users/authenticated-users.service';

@ApiTags('Users')
@Controller('authenticated')
export class AuthenticatedUsersController {
  constructor(
    private readonly authenticatedUsersService: AuthenticatedUsersService,
  ) {}

  @Post('check-in')
  @HttpCode(HttpStatus.OK)
  checkIn(
    @ApiGatewayRequestHeaders()
    {requestingUserSubjectId, requestingUserEmail}: ApiGatewayRequestHeadersDto,
  ) {
    return this.authenticatedUsersService.checkIn(
      requestingUserSubjectId,
      requestingUserEmail,
    );
  }
}
