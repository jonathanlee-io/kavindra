import {Test, TestingModule} from '@nestjs/testing';

import {EmbedScriptsServiceController} from './embed-scripts-service.controller';
import {EmbedScriptsServiceService} from './embed-scripts-service.service';

describe('EmbedScriptsServiceController', () => {
  let embedScriptsServiceController: EmbedScriptsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmbedScriptsServiceController],
      providers: [EmbedScriptsServiceService],
    }).compile();

    embedScriptsServiceController = app.get<EmbedScriptsServiceController>(
      EmbedScriptsServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(embedScriptsServiceController.getHello()).toBe('Hello World!');
    });
  });
});
