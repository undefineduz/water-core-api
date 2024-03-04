import { Module } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { BcyptService } from './bcrypt.service';

@Module({
  exports: [
    HashingService,
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcyptService,
    },
  ],

})
export class HashingModule { }
