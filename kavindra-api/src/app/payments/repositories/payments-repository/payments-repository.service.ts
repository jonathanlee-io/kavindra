import {Injectable} from '@nestjs/common';

import {PrismaService} from '../../../../lib/prisma/services/prisma.service';
import {PaymentPlanDto} from '../../dto/PaymentPlan.dto';

@Injectable()
export class PaymentsRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPaymentPlans() {
    return this.prismaService.paymentPlan.findMany({
      orderBy: {
        sortIndex: 'asc',
      },
    });
  }

  async updatePaymentPlans(toUpdate: PaymentPlanDto[]) {
    return this.prismaService.$transaction(async (prisma) => {
      for (const paymentPlan of toUpdate) {
        await prisma.paymentPlan.updateMany({
          where: {
            id: paymentPlan.id,
          },
          data: {
            name: paymentPlan.name,
            description: paymentPlan.description,
            monthlyPrice: paymentPlan.monthlyPrice,
            features: paymentPlan.features,
            tag: paymentPlan.tag,
            sortIndex: paymentPlan.sortIndex,
            stripePricingTableId: paymentPlan.stripePricingTableId,
            stripePublishableKey: paymentPlan.stripePublishableKey,
          },
        });
      }
    });
  }
}
