import {createParamDecorator, ExecutionContext} from '@nestjs/common';

import {ApiGatewayRequestHeadersDto} from '../domain/ApiGatewayRequestHeaders.dto';

export const ApiGatewayRequestHeaders = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const hostHeaders = request.headers['X-Forwarded-Host'.toLowerCase()];
    const hostsList = hostHeaders
      ? (Array.from(new Set(hostHeaders.split(','))) as string[])
      : [];
    const host = hostsList.length > 0 ? hostsList[0] : '';
    const clientSubdomain = host.split('.')?.[0];
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
