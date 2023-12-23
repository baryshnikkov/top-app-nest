import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcrypt';
import { UserModel, UserDocument } from './user.model';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel.name)
		private readonly userModel: Model<UserDocument>,
	) {}

	async createUser(dto: UserDto) {
		const salt = genSaltSync(10);
		const newUser = new this.userModel({
			email: dto.login,
			passwordHash: hashSync(dto.password, salt),
		});

		return await newUser.save();
	}

	async findUser(email: string) {
		return await this.userModel.findOne({ email }).exec();
	}
}
