import { Injectable } from '@nestjs/common';

@Injectable()
export class IssuesServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
