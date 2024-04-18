import { Controller, FileTypeValidator, HttpStatus, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocalFilesService } from './local-files.service';

@Controller('local-files')
export class LocalFilesController {
    constructor(
        private readonly localFilesService: LocalFilesService
    ) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 10 * 1024 ** 2 }),
                new FileTypeValidator({ fileType: '(png|jpeg|jpg|pdf|docx|xlsx  )' }),
            ],
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),
    ) file) {
        return this.localFilesService.saveLocalFileData(file)
    }
}
