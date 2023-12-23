import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ALREADY_REGISTERED_ERROR } from './user.constants';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: UserDto) {
		const hasUser = await this.userService.findUser(dto.login);

		if (hasUser) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR);
		}

		return await this.userService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: UserDto) {
		const user = await this.userService.validateUser(
			dto.login,
			dto.password,
		);

		return await this.userService.login(user.email);
	}
}
