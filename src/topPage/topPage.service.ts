import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
	TopLevelCategory,
	TopPageDocument,
	TopPageModel,
} from './topPage.model';
import { CreateTopPageDto } from './dto/createTopPage.dto';

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPageModel.name)
		private readonly topPageModel: Model<TopPageDocument>,
	) {}

	async create(dto: CreateTopPageDto) {
		return await this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return await this.topPageModel.findById(id).exec();
	}

	async findByAlias(alias: string) {
		return await this.topPageModel.findOne({ alias }).exec();
	}

	async findAll() {
		return await this.topPageModel.find({}).exec();
	}

	async findByCategory(firstCategory: TopLevelCategory) {
		return this.topPageModel
			.aggregate()
			.match({
				firstCategory,
			})
			.group({
				_id: { secondCategory: '$secondCategory' },
				pages: {
					$push: {
						alias: '$alias',
						title: '$title',
						_id: '$_id',
						category: '$category',
					},
				},
			})
			.exec();
	}

	async findByText(text: string) {
		return await this.topPageModel
			.find({
				$text: {
					$search: text,
					$caseSensitive: false,
				},
			})
			.exec();
	}

	async deleteById(id: string) {
		return await this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateTopPageDto) {
		return await this.topPageModel
			.findByIdAndUpdate(id, dto, { new: true })
			.exec();
	}
}
