import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel, TopPageSchema } from './topPage.model';

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
