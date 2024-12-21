export interface CreateProjectDto {
  subdomain: string;
  isBugReportsEnabled: boolean;
  isFeatureRequestsEnabled: boolean;
  isFeatureFeedbackEnabled: boolean;
}
