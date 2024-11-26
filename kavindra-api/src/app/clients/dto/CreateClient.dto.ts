import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsString, IsUUID, Matches} from 'class-validator';

export class CreateClientDto {
  @IsDefined()
  @IsString()
  @Matches(/^[a-z0-9][a-z0-9-_]{0,61}$/)
  @ApiProperty({required: true})
  subdomain: string;

  @IsDefined()
  @IsString()
  @ApiProperty({required: true})
  clientDescription: string;

  @IsDefined()
  @IsString()
  @ApiProperty({required: true})
  projectName: string;

  @IsDefined()
  @IsString()
  @IsUUID()
  @ApiProperty({required: true})
  paymentPlanId: string;
}
