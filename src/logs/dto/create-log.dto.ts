import { IsString, IsNumber } from 'class-validator';

export class CreateLogDto {
  @IsString()
  route: string;

  @IsString()
  method: string;

  @IsNumber()
  responseTime: number;
}
