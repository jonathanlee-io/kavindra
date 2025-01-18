import {jestIntegrationTestTimeout} from '@app/constants';
import {PrismaModule} from '@app/prisma';
import {
  initializePostgresTestContainer,
  tearDownPostgresTestContainer,
} from '@app/util';
import {Test, TestingModule} from '@nestjs/testing';
import {StartedPostgreSqlContainer} from '@testcontainers/postgresql';
import {Client} from 'pg';

import {IssuesRepositoryService} from './issues-repository.service';

describe('IssuesRepositoryService', () => {
  jest.setTimeout(jestIntegrationTestTimeout);

  let repository: IssuesRepositoryService;
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
      imports: [PrismaModule],
      providers: [IssuesRepositoryService],
    }).compile();

    repository = module.get<IssuesRepositoryService>(IssuesRepositoryService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
