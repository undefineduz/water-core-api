import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingRepository } from './setting.repository';
import { InsertPriceDto } from './dto/insert-price.dto';

@Injectable()
export class SettingService {
  constructor(
    private readonly settingRepository: SettingRepository
  ) { }
  public async create(insertPriceDto: InsertPriceDto) {
    const isExist = await this.settingRepository.findOneBy({ key: 'price' });
    if (isExist) {
      isExist.value = insertPriceDto.price.toString();
      return await this.settingRepository.save(isExist);
    }
    return await this.settingRepository.save({ key: 'price', value: insertPriceDto.price.toString() });
  }

  findAll() {
    return `This action returns all setting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    return `This action updates a #${id} setting`;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}
