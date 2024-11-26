import {faker} from '@faker-js/faker/locale/en';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import {Client} from 'pg';

import {delayedAction, runPrismaMigrations} from './helpers.util';
import {CreateClientDto} from '../../app/clients/dto/CreateClient.dto';
import {supabaseUserIdKey} from '../constants/auth/supabase-user-id.constants';

export const initializePostgresTestContainer = async () => {
  const initializedPostgresContainer = await new PostgreSqlContainer().start();
  const initializedPostgresClient = new Client({
    connectionString: initializedPostgresContainer.getConnectionUri(),
  });
  await initializedPostgresClient.connect();
  await runPrismaMigrations(initializedPostgresContainer.getConnectionUri());
  return {initializedPostgresContainer, initializedPostgresClient};
};

export const tearDownPostgresTestContainer = async (
  postgresContainer: StartedPostgreSqlContainer,
  postgresClient: Client,
) => {
  await postgresClient.end();
  await delayedAction(async () => {
    await postgresContainer.stop();
  });
};

export const createMockAuthUser = (overrides?: {
  supabaseUserId?: string;
  email?: string;
  isEmailVerified?: boolean;
  name?: string;
}) => ({
  [supabaseUserIdKey]: overrides?.supabaseUserId ?? faker.string.uuid(),
  email: overrides?.email ?? faker.internet.email(),
  email_verified: overrides?.isEmailVerified ?? true,
  user_metadata: {
    name: overrides?.name ?? faker.internet.displayName(),
  },
});

export const createMockCreateClientDto = (overrides?: {
  subdomain?: string;
  clientDescription?: string;
  projectName?: string;
  paymentPlanId?: string;
}): CreateClientDto => ({
  subdomain: overrides?.subdomain ?? faker.internet.domainName().split('.')[0],
  clientDescription: overrides?.clientDescription ?? faker.lorem.paragraph(),
  projectName: overrides?.projectName ?? faker.lorem.text(),
  paymentPlanId: overrides?.paymentPlanId ?? faker.string.uuid(),
});
