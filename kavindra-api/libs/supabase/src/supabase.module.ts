import {SupabaseStorageService} from '@app/supabase/supabase-storage.service';
import {Module} from '@nestjs/common';

@Module({
  providers: [SupabaseStorageService],
  exports: [SupabaseStorageService],
})
export class SupabaseModule {}
