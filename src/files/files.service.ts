import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { FileElementResponse } from './dto/fileElement.response';

@Injectable()
export class FilesService {
	async saveFiles(
		files: Express.Multer.File[],
	): Promise<FileElementResponse[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${path}/uploads/${dateFolder}`;
		await ensureDir(uploadFolder);

		const response: FileElementResponse[] = [];

		for (const file of files) {
			await writeFile(
				`${uploadFolder}/${file.originalname}`,
				file.buffer,
			);

			response.push({
				url: `${dateFolder}/${file.originalname}`,
				name: file.originalname,
			});
		}

		return response;
	}
}
