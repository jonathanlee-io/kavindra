export interface ProjectDto {
  id: string;
  name: string;
  subdomain: string;
  isBugReportsEnabled: boolean;
  isFeatureRequestsEnabled: boolean;
  isFeatureFeedbackEnabled: boolean;
  clientId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
