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

    async createAd(params): Promise<any> {
        const currentTime = new Date().getTime();
        const ad = new Ad();
        ad.adName = params.adName;
        ad.adUrl = params.adUrl;
        ad.adImage = params.adImage;
        ad.adDesc = params.adDesc;
        ad.adPosition = params.adPosition;
        ad.updateTime = currentTime;
        ad.cdate = currentTime;
        ad.status = 0;
        return this.adRepository.save(ad).then(() => {
            return '操作成功';
        }).catch( (err) => {
            console.log('createAd-err=', err);
            throw new CustomException('操作失败');
        });
    }
    async getAdCount(): Promise<number> {
        return await this.adRepository.createQueryBuilder('ad').getCount();
    }
    async getAdList(params): Promise<AdInterface[]> {
        const linkList = await this.adRepository.createQueryBuilder('ad')
            .skip( (params.currentPage - 1) * params.limit)
            .take(params.limit)
            .where('ad.status = :status', {status: params.status})
            .orderBy('ad.cdate', 'DESC')
            .getMany();
        return linkList;
    }

    async updateAd(params): Promise<any> {
        return await this.adRepository.update(params.id, {
            adName: params.adName,
            adUrl: params.adUrl,
            adImage: params.adImage,
            adDesc: params.adDesc,
            adPosition: params.adPosition,
        }).then(() => {
            return '操作成功';
        }).catch( (err) => {
            console.log('updateAd-err=', err);
            throw new CustomException('操作失败');
        });
    }

    async deleteAd(params): Promise<any> {
        return await this.adRepository.update(params.id, {
            status: params.status,
        }).then(() => {
            return '操作成功';
        }).catch( (err) => {
            console.log('deleteAd-err=', err);
            throw new CustomException('操作失败');
        });
    }

}
