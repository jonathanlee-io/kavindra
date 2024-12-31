import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
