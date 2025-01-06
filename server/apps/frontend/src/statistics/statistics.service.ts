import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Statistic} from '@libs/db/entity/statistics.entity';
import {Repository} from 'typeorm';

@Injectable()
export class StatisticsService {
    constructor(
        @InjectRepository(Statistic)
        private readonly statisticsRepo: Repository<Statistic>,
    ) {}

    async getStatisticsInfo(): Promise<any> {
        return await this.statisticsRepo.query(`
            select
                ip, currentIp, pv, currentPv, uv, currentUv
                from statistic
        `);
    }
}
