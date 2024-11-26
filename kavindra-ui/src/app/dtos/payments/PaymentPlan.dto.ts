export interface PaymentPlanDto {
  id: string;
  name: string;
  monthlyTotal: string;
  maxTeamMembers: string;
  maxProjects: string;
  features: string[];
  stripePricingTableId: string;
  stripePublishableKey: string;
}
