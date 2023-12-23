import {
	BadRequestException,
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { USER_REGISTERED_ERROR } from './user.constants';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: UserDto) {
		const hasUser = await this.userService.findUser(dto.login);

		if (hasUser) {
			throw new BadRequestException(USER_REGISTERED_ERROR);
		}

		return await this.userService.createUser(dto);
	}

	// @HttpCode(200)
	// @Post('login')
	// async login(@Body() dto: UserDto) {}
}
