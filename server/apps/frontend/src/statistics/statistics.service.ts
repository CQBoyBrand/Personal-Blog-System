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

    async getStatisticsInfo(): Promise<any> {
        const todayIp = await this.getTodayIP();
        const todayPv = await this.getTodayPV();
        const totalArticles = await this.getAllArticleCount();
        const statisticsInfo = await this.statisticsRepo.query(`
            select
                ip, currentIp, pv, currentPv, uv, currentUv
                from statistic
        `);
        let result = statisticsInfo[0] || {}
        result.currentIp = todayIp.length;
        result.currentPv = todayPv[0]?.pvNum || 0;
        result.totalArticles = totalArticles || 0;
        return result
    }

    async getTodayIP(): Promise<any> {
        return await this.IpRepo.query(`
            SELECT * 
                FROM ip 
                WHERE updateTime >= UNIX_TIMESTAMP(CURDATE()) * 1000
                AND updateTime < UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY) * 1000;
        `);
    }
    async getTodayPV(): Promise<any> {
        return await this.IpRepo.query(`
            SELECT * 
                FROM pv 
                WHERE updateTime >= UNIX_TIMESTAMP(CURDATE()) * 1000
                AND updateTime < UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY) * 1000;
        `);
    }
    async getAllArticleCount(): Promise<any> {
        return await this.articleRepo.createQueryBuilder('article')
        .where('article.status = :status', {status: 1})
        .getCount();
    }
}
