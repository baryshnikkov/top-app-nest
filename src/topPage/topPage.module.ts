import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel, TopPageSchema } from './models/topPage.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: TopPageModel.name,
				schema: TopPageSchema,
			},
		]),
	],
})
export class TopPageModule {}
