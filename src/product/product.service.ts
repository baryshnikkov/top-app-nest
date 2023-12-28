import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument, ProductModel } from './product.model';
import { CreateProductDto } from './dto/createProduct.dto';
import { FindProductDto } from './dto/findProduct.dto';
import { ReviewModel } from 'src/review/review.model';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(ProductModel.name)
		private readonly productModel: Model<ProductDocument>,
	) {}

	async create(dto: CreateProductDto) {
		return await this.productModel.create(dto);
	}

	async findById(id: string) {
		return await this.productModel.findById(id).exec();
	}

	async deleteById(id: string) {
		return await this.productModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateProductDto) {
		return await this.productModel
			.findByIdAndUpdate(id, dto, {
				new: true,
			})
			.exec();
	}

	async findWithReviews(dto: FindProductDto) {
		return (await this.productModel
			.aggregate([
				{
					$match: {
						categories: dto.category,
					},
				},
				{
					$sort: {
						_id: 1,
					},
				},
				{
					$limit: dto.limit,
				},
				{
					$lookup: {
						from: 'reviewmodels',
						localField: '_id',
						foreignField: 'productId',
						as: 'reviews',
					},
				},
				{
					$addFields: {
						reviewCount: { $size: '$reviews' },
						reviewAvg: { $avg: '$reviews.rating' },
						reviews: {
							$function: {
								body: `function (reviews) {
									reviews.sort(
										(a, b) =>
											new Date(b.createdAt) -
											new Date(a.createdAt),
									);

									return reviews;
								}`,
								args: ['$reviews'],
								lang: 'js',
							},
						},
					},
				},
			])
			.exec()) as (ProductModel & {
			review: ReviewModel[];
			reviewCount: number;
			reviewAvg: number;
		})[];
	}
}
