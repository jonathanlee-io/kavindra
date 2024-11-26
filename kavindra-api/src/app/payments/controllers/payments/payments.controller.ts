import {Controller, Get} from '@nestjs/common';
import {AuthUser} from '@supabase/supabase-js';

import {CurrentUser} from '../../../../lib/auth/supabase/decorators/current-user.decorator';
import {host} from '../../../../lib/config/host.config';
import {PaymentsService} from '../../services/payments/payments.service';

@Controller({host})
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('plans')
  async getPlans(@CurrentUser() currentUser: AuthUser) {
    return this.paymentsService.getPlans(currentUser);
  }
}
