import { Schema } from '@nestjs/mongoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

@Schema()
export class TopPageModel {
	_id: string;
	firstCategory: TopLevelCategory;
	secondCategory: string;
	title: string;
	category: string;
	hh?: {
		count: number;
		juniorSalary: number;
		middleSalary: number;
		seniorSalary: number;
	};
	advantages?: {
		title: string;
		description: string;
	}[];
	setText: string;
	tagsTitle: string;
	tags: string[];
}
