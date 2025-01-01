import {CacheInterceptor} from '@nestjs/cache-manager';
import {Controller, Get, UseInterceptors} from '@nestjs/common';
import {CacheTTL} from '@nestjs/common/cache';

import {Public} from '../../../../lib/auth/supabase/decorators/is-public.decorator';
import {oneDayInMilliseconds} from '../../../../lib/constants/time/time.constants';
import {PaymentsService} from '../../services/payments/payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Public()
  @Get('plans')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(oneDayInMilliseconds)
  async getPlans() {
    return this.paymentsService.getPlans();
  }
}
