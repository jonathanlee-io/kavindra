import {Injectable, Logger, OnModuleInit} from '@nestjs/common';

import {PaymentPlanDto} from '../../dto/PaymentPlan.dto';
import {PaymentsRepositoryService} from '../../repositories/payments-repository/payments-repository.service';

@Injectable()
export class PaymentsService implements OnModuleInit {
  static readonly paymentPlans: PaymentPlanDto[] = [
    {
      id: '4145d0a7-73c9-4997-a971-690eefa5968a',
      name: 'Indie Hacker',
      description: 'The essentials to provide your best work for your clients',
      monthlyPrice: '$19.99',
      features: [
        'Up to 5 projects',
        'Up to 10 team members',
        'Custom subdomain',
        'Embeddable Feedback Widget',
      ],
      stripePricingTableId: 'prctbl_1QNQf2Ctqipjj4SBOOWyi4wy',
      stripePublishableKey:
        'pk_test_51QLq5wCtqipjj4SBEPU29LCPwZUPBXkrpmjhNYCjqBtAMjNiIzf718UNPLPEPbCokgs3ZXe7BV0plqmiiFQLiwkm00WAQxjvwc',
    },
    {
      id: 'a673e68f-a276-4cdf-9179-aa404f2f1467',
      name: 'Startup',
      description: 'A plan that scales with your rapidly growing business.',
      monthlyPrice: '$39.99',
      features: [
        'Up to 15 projects',
        'Up to 150 team members',
        'Custom subdomain',
        'Embeddable Feedback Widget',
      ],
      tag: 'Most Popular',
      stripePricingTableId: 'prctbl_1QNQmHCtqipjj4SB8UV3onnl',
      stripePublishableKey:
        'pk_test_51QLq5wCtqipjj4SBEPU29LCPwZUPBXkrpmjhNYCjqBtAMjNiIzf718UNPLPEPbCokgs3ZXe7BV0plqmiiFQLiwkm00WAQxjvwc',
    },
    {
      id: '3bc752b6-a13d-4ba7-be31-c062200f9351',
      name: 'Enterprise',
      description: 'Dedicated support and infrastructure for your company.',
      monthlyPrice: '$174.99',
      features: [
        'Unlimited projects',
        'Unlimited team members',
        'Custom hostname',
        'Embeddable Feedback Widget',
      ],
      stripePricingTableId: 'enterprise',
      stripePublishableKey: 'enterprise',
    },
  ];

  constructor(
    private readonly logger: Logger,
    private readonly paymentsRepository: PaymentsRepositoryService,
  ) {}

  async getPlans() {
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
    paymentPlans.forEach((paymentPlan) => {
      if (
        !PaymentsService.paymentPlans
          .map((plan) => plan.id)
          .includes(paymentPlan.id)
      ) {
        toRemove.push(paymentPlan);
      }
    });
    this.logger.log(
      `Inserting ${toPersist.length} payment plans and removing ${toRemove.length} payment plans`,
    );
    await this.paymentsRepository.updatePaymentPlans(toPersist, toRemove);
  }
}
