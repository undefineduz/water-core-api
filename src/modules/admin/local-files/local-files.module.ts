import { Module } from '@nestjs/common';
import { LocalFilesService } from './local-files.service';
import { LocalFilesRepository } from './local-files.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalFile } from 'src/database/entities';
import { LocalFilesController } from './local-files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocalFile]),
    MulterModule.register({
      storage: diskStorage({
        destination: './storage/files',
        filename(req, file, callback) {
          // Generating a 32 random chars long string
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          //Calling the callback passing the random name generated with the original extension name
          callback(null, `${randomName}${extname(file.originalname)}`);
        },
      })
    })
  ],
  providers: [LocalFilesService, LocalFilesRepository],
  exports: [LocalFilesService],
  controllers: [LocalFilesController]
})
export class LocalFilesModule { }
