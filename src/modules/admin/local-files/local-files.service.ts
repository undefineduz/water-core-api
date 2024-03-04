import { Injectable, NotFoundException } from '@nestjs/common';
import { LocalFilesRepository } from './local-files.repository';
import { LocalFileDto } from './dto/localFile.dto';

@Injectable()
export class LocalFilesService {
    constructor(
        private localFilesRepository: LocalFilesRepository,
    ) { }

    public async saveLocalFileData(fileData: LocalFileDto) {
        const newFile = this.localFilesRepository.create(fileData)
        await this.localFilesRepository.save(newFile);
        return newFile;
    }

    public async getFileById(fileId: number) {
        const file = await this.localFilesRepository.getById(fileId);
        if (!file) {
            throw new NotFoundException('File not found by id ' + fileId);
        }
        return file;
    }
}
