import {Test, TestingModule} from '@nestjs/testing';

import {IssuesServiceController} from './issues-service.controller';
import {IssuesServiceService} from './issues-service.service';

describe('IssuesServiceController', () => {
  let issuesServiceController: IssuesServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IssuesServiceController],
      providers: [IssuesServiceService],
    }).compile();

    issuesServiceController = app.get<IssuesServiceController>(
      IssuesServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(issuesServiceController.getHello()).toBe('Hello World!');
    });
  });
});
