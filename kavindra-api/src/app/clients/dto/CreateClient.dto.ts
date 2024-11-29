import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsString, IsUUID, Matches} from 'class-validator';

export class CreateClientDto {
  @IsDefined()
  @IsString()
  @Matches(/^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/)
  @ApiProperty({required: true})
  subdomain: string;

  @IsDefined()
  @IsString()
  @IsUUID()
  @ApiProperty({required: true})
  paymentPlanId: string;
}
