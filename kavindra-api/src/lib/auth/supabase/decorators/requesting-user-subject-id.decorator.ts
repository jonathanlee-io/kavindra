import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const RequestingUserSubjectId = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().headers[
      'X-Requesting-User-Subject-Id'.toLowerCase()
    ];
  },
);
