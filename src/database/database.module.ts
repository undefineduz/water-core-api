import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabseConfig } from 'src/common/configs';

@Module({
    imports: [
        TypeOrmModule.forRootAsync(DatabseConfig.asProvider())
    ]
})
export class DatabaseModule {}
