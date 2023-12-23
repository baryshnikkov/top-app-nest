import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({ timestamps: true })
export class UserModel {
	@Prop({
		type: MSchema.Types.ObjectId,
		auto: true,
	})
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

export const UserSchema = SchemaFactory.createForClass(UserModel);
