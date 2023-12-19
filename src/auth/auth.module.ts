import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthSchema } from './models/auth.model';

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
