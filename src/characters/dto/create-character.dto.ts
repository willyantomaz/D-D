import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  name: string;

  @IsString()
  class: string;

  @IsNumber()
  level: number;

  attributes: {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
  };

  @IsArray()
  feats: string[];

  @IsString()
  alignment: string;

  @IsArray()
  talents: string[];

  @IsArray()
  spells: string[];

  @IsArray()
  items: string[];
}
