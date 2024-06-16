import { IsString, IsNotEmpty, IsArray, IsOptional, IsObject } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  className: string;

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
