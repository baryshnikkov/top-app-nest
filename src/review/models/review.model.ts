import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true })
export class ReviewModel {
	@Prop({ auto: true })
	_id: string;

	@Prop()
	name: string;

	@Prop()
	title: string;

	@Prop()
	description: string;

	@Prop()
	rating: number;

	@Prop({ default: Date.now })
	createdAt: Date;

	@Prop({ default: Date.now })
	updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
