import {Injectable} from '@nestjs/common';

import {PrismaService} from '../../../../lib/prisma/services/prisma.service';
import {PaymentPlanDto} from '../../dto/PaymentPlan.dto';

@Injectable()
export class PaymentsRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPaymentPlans() {
    return this.prismaService.paymentPlan.findMany();
  }

  async updatePaymentPlans(
    toPersist: PaymentPlanDto[],
    toDelete: PaymentPlanDto[],
  ) {
    return this.prismaService.$transaction(async (prisma) => {
      await prisma.paymentPlan.deleteMany({
        where: {id: {in: toDelete.map((plan) => plan.id)}},
      });

      for (const paymentPlan of toPersist) {
        await prisma.paymentPlan.createMany({
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
    });
  }
}
