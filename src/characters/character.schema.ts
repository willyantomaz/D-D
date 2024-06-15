import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Character extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  class: string;

  @Prop()
  attributes: {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
  };

  @Prop()
  feats: string[];

  @Prop()
  alignment: string;

  @Prop()
  talents: string[];

  @Prop()
  spells: string[];

  @Prop()
  items: string[];

  @Prop()
  level: number;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
