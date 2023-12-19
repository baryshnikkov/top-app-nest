import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewSchema } from './models/review.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: ReviewModel.name,
				schema: ReviewSchema,
			},
		]),
	],
})
export class ReviewModule {}
