import {Controller, Get, Logger} from '@nestjs/common';

import {Public} from '../../../../lib/auth/supabase/decorators/is-public.decorator';
import {RequestingUserEmail} from '../../../../lib/auth/supabase/decorators/requesting-user-email.decorator';
import {RequestingUserSubjectId} from '../../../../lib/auth/supabase/decorators/requesting-user-subject-id.decorator';
import {host} from '../../../../lib/config/host.config';
import {PaymentsService} from '../../services/payments/payments.service';

@Controller({host})
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Public()
  @Get('plans')
  // @UseInterceptors(CacheInterceptor)
  // @CacheTTL(oneDayInMilliseconds)
  async getPlans(
    @RequestingUserEmail() requestingUserEmail: string,
    @RequestingUserSubjectId() requestingUserSubjectId: string,
  ) {
    Logger.log(requestingUserEmail);
    Logger.log(requestingUserSubjectId);
    return this.paymentsService.getPlans();
  }
}
