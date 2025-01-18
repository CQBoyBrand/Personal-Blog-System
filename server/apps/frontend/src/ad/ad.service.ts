import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Ad} from '@libs/db/entity/ad.entity';
import {Repository} from 'typeorm';
import {AdInterface} from './interface/ad.interface';
import {CustomException} from '@common/common/common/http.decoration';

@Injectable()
export class AdService {
    constructor(
        @InjectRepository(Ad)
        private readonly adRepository: Repository<Ad>,
    ) {}

    async getAdCount(): Promise<number> {
        return await this.adRepository.createQueryBuilder('ad')
        .where('ad.status = :status', {status: 1}).getCount();
    }
    async getAdList(params): Promise<AdInterface[]> {
        const adList = await this.adRepository.createQueryBuilder('ad')
            .where('ad.status = :status', {status: 1})
            .orderBy('ad.cdate', 'DESC')
            .getMany();
        return adList;
    }
}
