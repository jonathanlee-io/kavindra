import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsString, IsUUID, Matches} from 'class-validator';

export class CreateProjectDto {
  @IsDefined()
  @IsString()
  @Matches(/^[a-z0-9][a-z0-9-_]{0,61}$/)
  @ApiProperty({required: true})
  name: string;

  @IsDefined()
  @IsString()
  @IsUUID()
  @ApiProperty({required: true})
  clientId: string;
}
