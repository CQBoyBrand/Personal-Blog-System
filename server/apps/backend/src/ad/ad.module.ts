import { Module } from '@nestjs/common';
import { AdService } from './ad.service';
import {AdController} from './ad.controller';

@Module({
  imports: [],
  controllers: [AdController],
  providers: [AdService],
})
export class AdModule {}
