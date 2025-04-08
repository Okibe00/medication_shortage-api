import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type DrugDocument = HydratedDocument<Drug>;

@Schema({ timestamps: true })
export class Drug {
  @Prop({ type: String, default: uuidv4 })
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  category: string;
  @Prop({ required: true })
  manufacturer: string;
}
export const DrugSchema = SchemaFactory.createForClass(Drug);
//middleswares goes after here if needed;
