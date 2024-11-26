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
        features: paymentPlan.features,
        name: paymentPlan.name,
        maxProjects: paymentPlan.maxProjects,
        maxTeamMembers: paymentPlan.maxTeamMembers,
        monthlyTotal: paymentPlan.monthlyTotal,
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
