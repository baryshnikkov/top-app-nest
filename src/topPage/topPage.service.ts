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

	async findByCategory(firstCategory: TopLevelCategory) {
		return await this.topPageModel
			.find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 })
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
