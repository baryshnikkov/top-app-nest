import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel, TopPageSchema } from './topPage.model';
import { TopPageController } from './topPage.controller';
import { TopPageService } from './topPage.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: TopPageModel.name,
				schema: TopPageSchema,
			},
		]),
	],
	controllers: [TopPageController],
	providers: [TopPageService],
	exports: [TopPageService],
})
export class TopPageModule {}
