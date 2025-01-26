import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Statistic} from '@libs/db/entity/statistics.entity';
import {Repository} from 'typeorm';
import { Ip } from '@libs/db/entity/ip.entity';
import { Article } from '@libs/db/entity/article.entity';

@Injectable()
export class StatisticsService {
    constructor(
        @InjectRepository(Statistic)
        private readonly statisticsRepo: Repository<Statistic>,
        @InjectRepository(Ip)
        private readonly IpRepo: Repository<Ip>,
        @InjectRepository(Article)
        private readonly articleRepo: Repository<Article>,
    ) {}

    async getAllArticleCount(): Promise<any> {
        return await this.articleRepo.createQueryBuilder('article')
        .where('article.status = :status', {status: 1})
        .getCount();
    }
    async getStatisticsInfo(): Promise<any> {
        const totalArticles = await this.getAllArticleCount();
        const statisticsInfo = await this.statisticsRepo.query(`
            select
                ip, currentIp, pv, currentPv, uv, currentUv
                from statistic
        `);
        let result = statisticsInfo[0] || {}
        result.totalArticles = totalArticles || 0;
        return result
;    }
}
