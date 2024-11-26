import {faker} from '@faker-js/faker/locale/en';
import {Mocked, TestBed} from '@suites/unit';
import {AuthUser} from '@supabase/supabase-js';

import {ClientsController} from './clients.controller';
import {
  createMockAuthUser,
  createMockCreateClientDto,
} from '../../../../lib/util/tests.helpers.util';
import {ClientsService} from '../../services/clients/clients.service';

describe('ClientsController', () => {
  let controller: ClientsController;
  let mockClientsService: Mocked<ClientsService>;

  beforeEach(async () => {
    const {unit, unitRef} = await TestBed.solitary(ClientsController).compile();

    controller = unit;
    mockClientsService = unitRef.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(mockClientsService).toBeDefined();
  });

  it('should register new client', async () => {
    const mockUser = createMockAuthUser();

    const mockCreateClientDto = createMockCreateClientDto();

    mockClientsService.createClient.mockResolvedValue({
      isSuccessful: true,
      clientId: faker.string.uuid(),
    });

    const result = await controller.registerNewClient(
      mockUser as unknown as AuthUser,
      mockCreateClientDto,
    );

    expect(result.isSuccessful).toBe(true);
    expect(mockClientsService.createClient).toHaveBeenCalledWith(
      mockUser as unknown as AuthUser,
      mockCreateClientDto,
    );
  });

  it('should fetch is subdomain available', async () => {
    const mockUser = createMockAuthUser();

    const subdomain = faker.internet.domainName().split('.')[0];

    mockClientsService.checkIfSubdomainAvailable.mockResolvedValue({
      isSubdomainAvailable: false,
      subdomain,
    });

    const result = await controller.isSubdomainAvailable(
      mockUser as unknown as AuthUser,
      {subdomain},
    );

    expect(result.isSubdomainAvailable).toBe(false);
    expect(result.subdomain).toStrictEqual(subdomain);
    expect(mockClientsService.checkIfSubdomainAvailable).toHaveBeenCalledWith(
      {subdomain},
      mockUser as unknown as AuthUser,
    );
  });
});
