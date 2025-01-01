import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const RequestingUserEmail = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().headers[
      'X-Requesting-User-Email'.toLowerCase()
    ];
  },
);
