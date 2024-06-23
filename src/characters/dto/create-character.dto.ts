import { IsString, IsNotEmpty, IsArray, IsOptional, IsObject, IsInt, Min, Max } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  className: string;

  @IsString()
  @IsNotEmpty()
  race: string;

  @IsInt()
  @Min(1)
  @Max(20)
  level: number;

  @IsString()
  @IsNotEmpty()
  alignment: string;

  @IsObject()
  @IsNotEmpty()
  attributes: { [key: string]: number };

  @IsArray()
  @IsOptional()
  feats?: string[];

  @IsArray()
  @IsOptional()
  spells?: string[];

  @IsArray()
  @IsOptional()
  items?: string[];
}
