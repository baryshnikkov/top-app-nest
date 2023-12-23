import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TopPageModule } from './topPage/topPage.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { getMongoConfig } from './configs/mongo.config';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		UserModule,
		TopPageModule,
		ProductModule,
		ReviewModule,
	],
})
export class AppModule {}
