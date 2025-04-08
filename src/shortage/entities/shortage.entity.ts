import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type ShortageDocument = HydratedDocument<Shortage>;

@Schema({ timestamps: true })
export class Shortage {
  @Prop({ type: String, default: uuidv4 })
  _id: string;
  @Prop({ type: Types.ObjectId, refs: 'Drug' })
  drug_id: Types.ObjectId;
  @Prop({ required: true })
  region: string;
  @Prop({ required: true })
  status: string;
  @Prop({ required: true })
  reported_by: string;
  @Prop({ required: true, default: Date.now })
  reported_at: Date;
  @Prop({ required: true })
  estimated_restock: string;
  @Prop({ required: true })
  reason: string;
  @Prop({ required: true })
  alternatives: string[];
}
export const ShortageSchema = SchemaFactory.createForClass(Shortage);
