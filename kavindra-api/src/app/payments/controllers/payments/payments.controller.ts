import {Controller, Get, Logger} from '@nestjs/common';

import {ApiGatewayRequestHeaders} from '../../../../lib/auth/api-gateway/decorators/api-gateway-request-headers.decorator';
import {ApiGatewayRequestHeadersDto} from '../../../../lib/auth/api-gateway/domain/ApiGatewayRequestHeaders.dto';
import {Public} from '../../../../lib/auth/supabase/decorators/is-public.decorator';
import {PaymentsService} from '../../services/payments/payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Public()
  @Get('plans')
  // @UseInterceptors(CacheInterceptor)
  // @CacheTTL(oneDayInMilliseconds)
  async getPlans(
    @ApiGatewayRequestHeaders()
    {
      requestingUserEmail,
      requestingUserSubjectId,
      clientSubdomain,
    }: ApiGatewayRequestHeadersDto,
  ) {
    Logger.log(requestingUserEmail);
    Logger.log(requestingUserSubjectId);
    Logger.log(clientSubdomain);
    return this.paymentsService.getPlans();
  }
}
