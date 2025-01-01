import {Test, TestingModule} from '@nestjs/testing';

import {ProjectsServiceController} from './projects-service.controller';
import {ProjectsServiceService} from './projects-service.service';

describe('ProjectsServiceController', () => {
  let projectsServiceController: ProjectsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsServiceController],
      providers: [ProjectsServiceService],
    }).compile();

    projectsServiceController = app.get<ProjectsServiceController>(
      ProjectsServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(projectsServiceController.getHello()).toBe('Hello World!');
    });
  });
});
