import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {AuthUser} from '@supabase/supabase-js';

import {PaymentPlanDto} from '../../dto/PaymentPlan.dto';
import {PaymentsRepositoryService} from '../../repositories/payments-repository/payments-repository.service';

@Injectable()
export class PaymentsService implements OnModuleInit {
  static readonly paymentPlans: PaymentPlanDto[] = [
    {
      id: '1f578c8b-48a9-420a-9836-cfe2bfc65ddd',
      name: 'Freelancer',
      monthlyTotal: '$4.99',
      maxTeamMembers: '10',
      maxProjects: '5',
      features: ['GitHub Integration', 'Custom Subdomain'],
      stripePricingTableId: 'prctbl_1QNQf2Ctqipjj4SBOOWyi4wy',
      stripePublishableKey:
        'pk_test_51QLq5wCtqipjj4SBEPU29LCPwZUPBXkrpmjhNYCjqBtAMjNiIzf718UNPLPEPbCokgs3ZXe7BV0plqmiiFQLiwkm00WAQxjvwc',
    },
    {
      id: '81a56c01-c353-4939-89ce-613185378979',
      name: 'Startup',
      monthlyTotal: '$6.99',
      maxTeamMembers: '1,000',
      maxProjects: '50',
      features: ['GitHub Integration', 'Custom Subdomain'],
      stripePricingTableId: 'prctbl_1QNQmHCtqipjj4SB8UV3onnl',
      stripePublishableKey:
        'pk_test_51QLq5wCtqipjj4SBEPU29LCPwZUPBXkrpmjhNYCjqBtAMjNiIzf718UNPLPEPbCokgs3ZXe7BV0plqmiiFQLiwkm00WAQxjvwc',
    },
    {
      id: '9427195c-2388-4821-82c6-c0d5619e2258',
      name: 'Enterprise',
      monthlyTotal: 'Negotiable',
      maxTeamMembers: 'Unlimited',
      maxProjects: 'Unlimited',
      features: [
        'GitHub Integration',
        'Custom Subdomain',
        'Jenkins Integration',
      ],
      stripePricingTableId: 'enterprise',
      stripePublishableKey: 'enterprise',
    },
  ];

  constructor(
    private readonly logger: Logger,
    private readonly paymentsRepository: PaymentsRepositoryService,
  ) {}

  async getPlans(currentUser: AuthUser) {
    this.logger.log(
      `User with e-mail: <${currentUser.email}> getting payment plans`,
    );
    return this.paymentsRepository.getAllPaymentPlans();
  }

  async onModuleInit() {
    this.logger.log('Initializing payment plans');
    const paymentPlans = await this.paymentsRepository.getAllPaymentPlans();
    const toPersist: PaymentPlanDto[] = [];
    PaymentsService.paymentPlans.forEach((paymentPlan) => {
      if (!paymentPlans.map((plan) => plan.id).includes(paymentPlan.id)) {
        toPersist.push(paymentPlan);
      }
    });
    const toRemove: PaymentPlanDto[] = [];
    this.logger.log(
      `Inserting ${toPersist.length} payment plans and removing ${toRemove.length} payment plans`,
    );
    paymentPlans.forEach((paymentPlan) => {
      if (
        !PaymentsService.paymentPlans
          .map((plan) => plan.id)
          .includes(paymentPlan.id)
      ) {
        toRemove.push(paymentPlan);
      }
    });
    for (const paymentPlan of toPersist) {
      await this.paymentsRepository.create(paymentPlan);
    }
    for (const paymentPlan of toRemove) {
      await this.paymentsRepository.deleteById(paymentPlan.id);
    }
  }
}
