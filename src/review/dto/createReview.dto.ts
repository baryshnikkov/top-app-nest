import { IsNumber, IsString, Max, Min } from 'class-validator';
import { VALIDATE_RATING_MAX, VALIDATE_RATING_MIN } from '../review.constants';

export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Max(5, { message: VALIDATE_RATING_MAX })
	@Min(1, { message: VALIDATE_RATING_MIN })
	@IsNumber()
	rating: number;

	@IsString()
	productId: string;
}
