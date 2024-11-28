import {Injectable} from '@nestjs/common';

import {PrismaService} from '../../../../lib/prisma/services/prisma.service';
import {PaymentPlanDto} from '../../dto/PaymentPlan.dto';

@Injectable()
export class PaymentsRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPaymentPlans() {
    return this.prismaService.paymentPlan.findMany();
  }

  async create(paymentPlan: PaymentPlanDto) {
    await this.prismaService.paymentPlan.create({
      data: {
        id: paymentPlan.id,
        name: paymentPlan.name,
        description: paymentPlan.description,
        monthlyPrice: paymentPlan.monthlyPrice,
        features: paymentPlan.features,
        tag: paymentPlan.tag,
        stripePricingTableId: paymentPlan.stripePricingTableId,
        stripePublishableKey: paymentPlan.stripePublishableKey,
      },
    });
  }

  async deleteById(paymentPlanId: string) {
    await this.prismaService.paymentPlan.deleteMany({
      where: {
        id: paymentPlanId,
      },
    });
  }
}
