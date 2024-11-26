export interface ClientDto {
  id: string;
  displayName: string;
  description: string;
  userId: string;
  paymentPlanId: string;
  subdomains: { subdomain: string }[];
  projects: { name: string }[];
  createdBy: {
    supabaseUserId: string;
  };
  createdAt: string;
  updatedAt: string;
}
