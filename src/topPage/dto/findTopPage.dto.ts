import { IsEnum } from 'class-validator';
import { TopLevelCategory } from '../topPage.model';

export class FindTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;
}
