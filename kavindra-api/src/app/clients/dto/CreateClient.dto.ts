import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean, IsDefined, IsString, IsUUID, Matches} from 'class-validator';

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

  @IsDefined()
  @IsBoolean()
  @ApiProperty({required: true})
  isBugReportsEnabled: boolean;

  @IsDefined()
  @IsBoolean()
  @ApiProperty({required: true})
  isFeatureRequestsEnabled: boolean;

  @IsDefined()
  @IsBoolean()
  @ApiProperty({required: true})
  isFeatureFeedbackEnabled: boolean;
}
