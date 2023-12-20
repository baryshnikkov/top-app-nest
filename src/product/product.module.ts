import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductSchema } from './product.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: ProductModel.name,
				schema: ProductSchema,
			},
		]),
	],
})
export class ProductModule {}
