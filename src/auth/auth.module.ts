import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthSchema } from './auth.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: AuthModel.name,
				schema: AuthSchema,
			},
		]),
	],
})
export class AuthModule {}
