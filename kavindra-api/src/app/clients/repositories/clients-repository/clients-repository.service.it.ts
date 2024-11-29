import {faker} from '@faker-js/faker/locale/en';
import {Logger} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {AuthUser} from '@supabase/supabase-js';
import {StartedPostgreSqlContainer} from '@testcontainers/postgresql';
import {Client} from 'pg';

import {ClientsRepositoryService} from './clients-repository.service';
import {jestIntegrationTestTimeout} from '../../../../lib/constants/testing/integration-testing.constants';
import {PrismaModule} from '../../../../lib/prisma/prisma.module';
import {
  createMockAuthUser,
  initializePostgresTestContainer,
  tearDownPostgresTestContainer,
} from '../../../../lib/util/tests.helpers.util';
import {PaymentsModule} from '../../../payments/payments.module';
import {PaymentsService} from '../../../payments/services/payments/payments.service';
import {UsersRepositoryService} from '../../../users/repositories/users-repository/users-repository.service';
import {UsersModule} from '../../../users/users.module';

describe('ClientsRepositoryService', () => {
  jest.setTimeout(jestIntegrationTestTimeout);

  let repository: ClientsRepositoryService;
  let usersRepository: UsersRepositoryService;
  let paymentsService: PaymentsService;
  let postgresContainer: StartedPostgreSqlContainer;
  let postgresClient: Client;

  beforeAll(async () => {
    const {initializedPostgresContainer, initializedPostgresClient} =
      await initializePostgresTestContainer();
    postgresContainer = initializedPostgresContainer;
    postgresClient = initializedPostgresClient;
  });

  afterAll(async () => {
    await tearDownPostgresTestContainer(postgresContainer, postgresClient);
  });

  beforeEach(async () => {
    process.env['DATABASE_URL'] = postgresContainer.getConnectionUri();
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, UsersModule, PaymentsModule],
      providers: [
        {
          provide: Logger,
          useFactory: () => new Logger('test'),
        },
        ClientsRepositoryService,
        UsersRepositoryService,
        PaymentsService,
      ],
    }).compile();

    repository = module.get<ClientsRepositoryService>(ClientsRepositoryService);
    usersRepository = module.get<UsersRepositoryService>(
      UsersRepositoryService,
    );
    paymentsService = module.get<PaymentsService>(PaymentsService);
    await paymentsService.onModuleInit();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a client', async () => {
    const mockUserData = createMockAuthUser();

    await usersRepository.createUserFromAuthUser(
      mockUserData as unknown as AuthUser,
    );

    const result = await repository.registerNewClientWithTransaction(
      mockUserData as unknown as AuthUser,
      faker.internet.domainName().split('.')[0],
      PaymentsService.paymentPlans[0].id,
    );

    expect(result).toBeDefined();
  });
});
