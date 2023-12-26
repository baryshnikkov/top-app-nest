import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';

class ProductCharacteristic {
	@Prop()
	name: string;

	@Prop()
	value: string;
}

export type ProductDocument = HydratedDocument<ProductModel>;

@Schema({ timestamps: true })
export class ProductModel {
	@Prop({
		type: MSchema.Types.ObjectId,
		auto: true,
	})
	_id: string;

	@Prop()
	image: string;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop()
	oldPrice?: number;

	@Prop()
	credit: number;

	@Prop()
	description: string;

	@Prop()
	advantages: string;

	@Prop()
	disAdvantages: string;

	@Prop({ type: [String] })
	categories: string[];

	@Prop({ type: [String] })
	tags: string[];

	@Prop({ type: [ProductCharacteristic], _id: false })
	characteristics: ProductCharacteristic[];

	@Prop({ default: Date.now })
	createdAt: Date;

	@Prop({ default: Date.now })
	updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
