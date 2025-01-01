import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import {Observable} from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const hostHeaders = request.headers['X-Forwarded-Host'.toLowerCase()];
    const hostsList = hostHeaders
      ? (Array.from(new Set(hostHeaders.split(','))) as string[])
      : [];
    const host = hostsList.length > 0 ? hostsList[0] : '';
    const clientSubdomain = host.split('.')?.[0];
    this.logger.log(
      `Request on client: ${clientSubdomain} from IP [${request.ip}] from user <${request?.headers?.['X-Requesting-User-Email'.toLowerCase()] ?? 'anonymous'}> ${request.method} ${request.url}`,
    );
    return next.handle();
  }
}
