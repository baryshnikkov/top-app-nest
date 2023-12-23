import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { UserDto } from 'src/user/dto/user.dto';
import {
	USER_NOT_FOUND_ERROR,
	WRONG_PASSWORD_ERROR,
} from 'src/user/user.constants';

const loginDto: UserDto = {
	login: 'mail@mail.ru',
	password: 'mailmail',
};

describe('UserController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/user/login (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/user/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
			});
	});

	it('/user/login (POST) - fail - USER_NOT_FOUND_ERROR', async () => {
		return request(app.getHttpServer())
			.post('/user/login')
			.send({ ...loginDto, login: 'notUser@test.com' })
			.expect(401)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe(USER_NOT_FOUND_ERROR);
			});
	});

	it('/user/login (POST) - fail - WRONG_PASSWORD_ERROR', async () => {
		return request(app.getHttpServer())
			.post('/user/login')
			.send({ ...loginDto, password: 'wrongPassword' })
			.expect(401)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe(WRONG_PASSWORD_ERROR);
			});
	});

	afterAll(() => {
		disconnect();
	});
});
