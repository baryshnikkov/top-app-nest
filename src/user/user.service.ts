import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
import { UserModel, UserDocument } from './user.model';
import { UserDto } from './dto/user.dto';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './user.constants';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel.name)
		private readonly userModel: Model<UserDocument>,
		private readonly jwtService: JwtService,
	) {}

	async createUser(dto: UserDto) {
		const salt = await genSalt(10);
		const newUser = new this.userModel({
			email: dto.login,
			passwordHash: await hash(dto.password, salt),
		});

		return await newUser.save();
	}

	async findUser(email: string) {
		return await this.userModel.findOne({ email }).exec();
	}

	async validateUser(
		email: string,
		password: string,
	): Promise<Pick<UserModel, 'email'>> {
		const user = await this.findUser(email);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}

		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}

		return { email: user.email };
	}

	async login(email: string) {
		const payload = { email };

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
