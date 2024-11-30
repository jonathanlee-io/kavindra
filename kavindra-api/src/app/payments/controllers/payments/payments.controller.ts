import {CacheInterceptor, CacheTTL} from '@nestjs/cache-manager';
import {Controller, Get, UseInterceptors} from '@nestjs/common';

import {Public} from '../../../../lib/auth/supabase/decorators/is-public.decorator';
import {host} from '../../../../lib/config/host.config';
import {PaymentsService} from '../../services/payments/payments.service';

@Controller({host})
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('plans')
  @Public()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(120_000)
  async getPlans() {
    return this.paymentsService.getPlans();
  }
}
