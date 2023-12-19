import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<AuthModel>;

@Schema({ timestamps: true })
export class AuthModel {
	@Prop({ auto: true })
	_id: string;

	@Prop({ unique: true })
	email: string;

	@Prop()
	passwordHash: string;

	@Prop({ default: Date.now })
	createdAt: Date;

	@Prop({ default: Date.now })
	updatedAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
