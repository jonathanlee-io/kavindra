import {jestIntegrationTestTimeout} from '@app/constants';
import {PrismaModule} from '@app/prisma';
import {
  initializePostgresTestContainer,
  tearDownPostgresTestContainer,
} from '@app/util';
import {CacheModule} from '@nestjs/cache-manager';
import {Logger} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {StartedPostgreSqlContainer} from '@testcontainers/postgresql';
import {Client} from 'pg';

import {ClientsRepositoryService} from './clients-repository.service';

describe('ClientsRepositoryService', () => {
  jest.setTimeout(jestIntegrationTestTimeout);

  let repository: ClientsRepositoryService;
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
      imports: [PrismaModule, CacheModule.register()],
      providers: [
        {
          provide: Logger,
          useFactory: () => new Logger('test'),
        },
        ClientsRepositoryService,
      ],
    }).compile();

    repository = module.get<ClientsRepositoryService>(ClientsRepositoryService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
