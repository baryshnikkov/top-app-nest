import * as request from 'supertest';
import { Types, disconnect } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { CreateReviewDto } from 'src/review/dto/createReview.dto';
import {
	REVIEW_NOT_FOUND,
	VALIDATE_RATING_MIN,
} from 'src/review/review.constants';
import { UserDto } from 'src/user/dto/user.dto';

const productId = new Types.ObjectId().toHexString();
const productIdFail = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
	name: 'Тест',
	title: 'Заголовок',
	description: 'Описание тестовое',
	rating: 3,
	productId: productId,
};

const loginDto: UserDto = {
	login: 'mail@mail.ru',
	password: 'mailmail',
};

describe('ReviewController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const { body } = await request(app.getHttpServer())
			.post('/user/login')
			.send(loginDto);

		token = body.access_token;
	});

	it('/review/create (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/review/byProduct/:productId (GET) - success', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1);
			});
	});

	it('review/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.set('Authorization', `Bearer ${token}`)
			.expect(200);
	});

	it('/review/create (POST) - fail', async () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send({ ...testDto, rating: 0 })
			.expect(400)
			.then(({ body }: request.Response) => {
				expect(body.message[0]).toBe(VALIDATE_RATING_MIN);
			});
	});

	it('/review/byProduct/:productId (GET) - fail', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productIdFail)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
			});
	});

	it('review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete('/review/' + productIdFail)
			.set('Authorization', 'Bearer ' + token)
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND,
			});
	});

	afterAll(() => {
		disconnect();
	});
});
