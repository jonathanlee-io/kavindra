import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {SupabaseAuthStrategy} from 'nestjs-supabase-auth';
import {ExtractJwt} from 'passport-jwt';

import {EnvironmentVariables} from '../../../config/environment';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  public constructor(configService: ConfigService<EnvironmentVariables>) {
    super({
      supabaseUrl: configService.getOrThrow<string>('SUPABASE_URL'),
      supabaseKey: configService.getOrThrow<string>('SUPABASE_PUBLIC_KEY'),
      supabaseOptions: {},
      supabaseJwtSecret: configService.getOrThrow<string>(
        'SUPABASE_JWT_SECRET',
      ),
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<any> {
    await super.validate(payload);
  }

  async authenticate(req: any) {
    super.authenticate(req);
  }
}
