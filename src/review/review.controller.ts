import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/createReview.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return await this.reviewService.create(dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedReview = await this.reviewService.delete(id);

		if (!deletedReview) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		} else {
			return deletedReview;
		}
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string) {
		return await this.reviewService.findByProductId(productId);
	}
}
