import {IsDefined, IsNotEmpty, IsString} from 'class-validator';

export class EnvironmentParamDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  environment: string;
}
