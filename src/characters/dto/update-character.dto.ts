import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class UpdateCharacterDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  className?: string;

  @IsString()
  @IsOptional()
  alignment?: string;

  @IsArray()
  @IsOptional()
  attributes?: { [key: string]: number };

  @IsArray()
  @IsOptional()
  feats?: string[];

  @IsArray()
  @IsOptional()
  spells?: string[];

  @IsArray()
  @IsOptional()
  items?: string[];

  // Adicione outros campos conforme necessário
}
