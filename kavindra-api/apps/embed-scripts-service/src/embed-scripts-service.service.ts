import {Injectable} from '@nestjs/common';

@Injectable()
export class EmbedScriptsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
