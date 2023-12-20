import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ReviewDocument, ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/createReview.dto';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(ReviewModel.name)
		private readonly reviewModel: Model<ReviewDocument>,
	) {}

	async create(dto: CreateReviewDto): Promise<ReviewModel> {
		return await this.reviewModel.create(dto);
	}

	// TODO типизировать
	async delete(id: string) {
		return await this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(productId: string): Promise<ReviewModel[]> {
		return await this.reviewModel
			.find({
				productId: new Types.ObjectId(productId),
			})
			.exec();
	}

	// TODO типизировать
	async deleteByProductId(productId: string) {
		return await this.reviewModel
			.deleteMany({
				productId: new Types.ObjectId(productId),
			})
			.exec();
	}
}
