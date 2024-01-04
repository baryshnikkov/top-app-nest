import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TopPageModule } from 'src/topPage/topPage.module';
import { SitemapController } from './sitemap.controller';

@Module({
	controllers: [SitemapController],
	imports: [TopPageModule, ConfigModule],
})
export class SitemapModule {}
