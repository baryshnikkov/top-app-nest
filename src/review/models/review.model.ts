import { Schema } from '@nestjs/mongoose';

@Schema()
export class ReviewModel {
	_id: string;
	name: string;
	title: string;
	description: string;
	rating: number;
	createdAt: Date;
}
