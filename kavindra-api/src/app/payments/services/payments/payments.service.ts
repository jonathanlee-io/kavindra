import {Injectable, Logger, OnModuleInit} from '@nestjs/common';

import {PaymentPlanDto} from '../../dto/PaymentPlan.dto';
import {PaymentsRepositoryService} from '../../repositories/payments-repository/payments-repository.service';

@Injectable()
export class PaymentsService implements OnModuleInit {
  static readonly paymentPlans: PaymentPlanDto[] = [
    {
      id: 'dd0f7e53-5891-4392-96de-0b75d1e87b47',
      name: 'Indie Hacker',
      description: 'The essentials to provide your best work for your clients',
      monthlyPrice: '$19.99',
      features: [
        'Up to 5 projects',
        'Up to 10 team members',
        'Custom subdomain',
      ],
      stripePricingTableId: 'prctbl_1QNQf2Ctqipjj4SBOOWyi4wy',
      stripePublishableKey:
        'pk_test_51QLq5wCtqipjj4SBEPU29LCPwZUPBXkrpmjhNYCjqBtAMjNiIzf718UNPLPEPbCokgs3ZXe7BV0plqmiiFQLiwkm00WAQxjvwc',
    },
    {
      id: '834301d2-4d25-4ec0-b729-b027721d9846',
      name: 'Startup',
      description: 'A plan that scales with your rapidly growing business.',
      monthlyPrice: '$39.99',
      features: [
        'Up to 15 projects',
        'Up to 150 team members',
        'Custom subdomain',
      ],
      tag: 'Most Popular',
      stripePricingTableId: 'prctbl_1QNQmHCtqipjj4SB8UV3onnl',
      stripePublishableKey:
        'pk_test_51QLq5wCtqipjj4SBEPU29LCPwZUPBXkrpmjhNYCjqBtAMjNiIzf718UNPLPEPbCokgs3ZXe7BV0plqmiiFQLiwkm00WAQxjvwc',
    },
    {
      id: 'a84dc340-f60b-46bc-b37c-0dcc2735fa31',
      name: 'Enterprise',
      description: 'Dedicated support and infrastructure for your company.',
      monthlyPrice: '$99.99',
      features: [
        'Unlimited projects',
        'Unlimited team members',
        'Custom hostname',
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
    for (const paymentPlan of toPersist) {
      await this.paymentsRepository.create(paymentPlan);
    }
    for (const paymentPlan of toRemove) {
      await this.paymentsRepository.deleteById(paymentPlan.id);
    }
  }
}
