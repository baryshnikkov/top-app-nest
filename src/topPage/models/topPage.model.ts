import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

class TopPageHh {
	@Prop()
	count: number;

	@Prop()
	juniorSalary: number;

	@Prop()
	middleSalary: number;

	@Prop()
	seniorSalary: number;
}

class TopPageAdvantage {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

export type TopPageDocument = HydratedDocument<TopPageModel>;

@Schema({ timestamps: true })
export class TopPageModel {
	@Prop({ auto: true })
	_id: string;

	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@Prop()
	secondCategory: string;

	@Prop({ unique: true })
	alias: string;

	@Prop()
	title: string;

	@Prop()
	category: string;

	@Prop({ type: TopPageHh })
	hh?: TopPageHh;

	@Prop({ type: [TopPageAdvantage], _id: false })
	advantages?: TopPageAdvantage[];

	@Prop()
	setText: string;

	@Prop()
	tagsTitle: string;

	@Prop({ type: [String] })
	tags: string[];

	@Prop({ default: Date.now })
	createdAt: Date;

	@Prop({ default: Date.now })
	updatedAt: Date;
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
