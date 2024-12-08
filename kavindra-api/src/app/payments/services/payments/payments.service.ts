import {Injectable, Logger, OnModuleInit} from '@nestjs/common';

import {PaymentPlanDto} from '../../dto/PaymentPlan.dto';
import {PaymentsRepositoryService} from '../../repositories/payments-repository/payments-repository.service';

@Injectable()
export class PaymentsService implements OnModuleInit {
  static readonly paymentPlans: PaymentPlanDto[] = [
    {
      id: '8b556c3b-49e3-4bcc-b968-78be42ab427b',
      name: 'Indie Hacker',
      description: 'The essentials to provide your best work for your clients',
      monthlyPrice: '$19.99',
      features: [
        'Up to 5 projects',
        'Up to 10 team members',
        'Custom subdomain',
        'Embeddable Feedback Widget',
      ],
      sortIndex: 0,
      stripePricingTableId: 'prctbl_1QNQf2Ctqipjj4SBOOWyi4wy',
      stripePublishableKey:
        'pk_test_51QLq5wCtqipjj4SBEPU29LCPwZUPBXkrpmjhNYCjqBtAMjNiIzf718UNPLPEPbCokgs3ZXe7BV0plqmiiFQLiwkm00WAQxjvwc',
    },
    {
      id: '3e1a5257-58a8-4769-970a-2214ef7bf80e',
      name: 'Startup',
      description: 'A plan that scales with your rapidly growing business.',
      monthlyPrice: '$49.99',
      features: [
        'Up to 15 projects',
        'Up to 150 team members',
        'Custom subdomain',
        'Embeddable Feedback Widget',
      ],
      sortIndex: 1,
      tag: 'Most Popular',
      stripePricingTableId: 'prctbl_1QNQmHCtqipjj4SB8UV3onnl',
      stripePublishableKey:
        'pk_test_51QLq5wCtqipjj4SBEPU29LCPwZUPBXkrpmjhNYCjqBtAMjNiIzf718UNPLPEPbCokgs3ZXe7BV0plqmiiFQLiwkm00WAQxjvwc',
    },
    {
      id: 'dc3f31cf-7d7d-4a54-b3c8-067bb6439fbc',
      name: 'Enterprise',
      description: 'Dedicated support and infrastructure for your company.',
      monthlyPrice: '$174.99',
      features: [
        'Unlimited projects',
        'Unlimited team members',
        'Custom hostname',
        'Embeddable Feedback Widget',
      ],
      sortIndex: 2,
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
