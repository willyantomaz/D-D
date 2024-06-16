import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Character extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  className: string;

  @Prop({ required: true })
  alignment: string;

  @Prop({ type: Object, required: true })
  attributes: { [key: string]: number };

  @Prop({ type: [String], default: [] })
  feats: string[];

  @Prop({ type: [String], default: [] })
  spells: string[];

  @Prop({ type: [String], default: [] })
  items: string[];

  // Adicione outros campos conforme necessário
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
