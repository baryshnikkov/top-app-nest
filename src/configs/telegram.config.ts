import { ConfigService } from '@nestjs/config';
import { TelegramOptions } from 'src/telegram/telegram.model';

export const getTelegramConfig = (
	configService: ConfigService,
): TelegramOptions => {
	const token = configService.get('TELEGRAM_TOKEN');

	if (!token) {
		throw new Error('TELEGRAM_TOKEN не задан');
	}

	return {
		token,
		chatId: configService.get('TELEGRAM_CHAT_ID') ?? '',
	};
};
