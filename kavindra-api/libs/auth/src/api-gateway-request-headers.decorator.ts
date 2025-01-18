import {ApiGatewayRequestHeadersDto} from '@app/auth/ApiGatewayRequestHeaders.dto';
import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const ApiGatewayRequestHeaders = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return <ApiGatewayRequestHeadersDto>{
      requestingUserEmail:
        request.headers['X-Requesting-User-Email'.toLowerCase()],
      requestingUserSubjectId:
        request.headers['X-Requesting-User-Subject-Id'.toLowerCase()],
      clientSubdomain:
        request.headers['X-Requesting-User-Client-Subdomain'.toLowerCase()],
    };
  },
);
