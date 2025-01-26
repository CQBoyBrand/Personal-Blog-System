import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Statistic} from '@libs/db/entity/statistics.entity';
import {Repository} from 'typeorm';
import { Ip } from '@libs/db/entity/ip.entity';
import { Article } from '@libs/db/entity/article.entity';
import { StatisticsInterface } from './interface/statistics.interface';
import { IpInterface } from './interface/ip.interface';
import { Pv } from '@libs/db/entity/pv.entity';

@Injectable()
export class StatisticsService {
    constructor(
        @InjectRepository(Statistic)
        private readonly statisticsRepo: Repository<Statistic>,
        @InjectRepository(Ip)
        private readonly ipRepo: Repository<Ip>,
        @InjectRepository(Article)
        private readonly articleRepo: Repository<Article>,
        @InjectRepository(Pv)
        private readonly pvRepo: Repository<Pv>,
        
    ) {}
    async getStatistics(): Promise<any> {
        const statisticsRes =  await this.statisticsRepo.query(`
            SELECT ip, currentIp, pv, currentPv, uv, currentUv, id
            FROM statistic
        `);
        return statisticsRes[0];
    }
    // 获取所有已发布文章数量
    async getAllArticleCount(): Promise<any> {
        return await this.articleRepo.createQueryBuilder('article')
        .where('article.status = :status', {status: 1})
        .getCount();
    }
    // 获取今日数据 
    async getTodayData(tableName: string): Promise<any> {
        return await this[`${tableName}Repo`].query(`
            SELECT * 
                FROM ${tableName} 
                WHERE updateTime >= UNIX_TIMESTAMP(CURDATE()) * 1000
                AND updateTime < UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY) * 1000;
        `);
    }
    // 设置 PV 信息
    async setPvInfo() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 补零到两位
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const todayPv = await this.getTodayData('pv');
        if (todayPv.length === 0) {
            const newPv: Pv = new Pv();
            newPv.pvNum = 1;
            newPv.cdate = formattedDate;
            newPv.updateTime = new Date().getTime();
            this.pvRepo.save(newPv);
        } else {
            this.pvRepo.update(todayPv[0].id, {
                pvNum: Number(todayPv[0].pvNum) + 1,
                updateTime: new Date().getTime(),
            });
        }
    }
    async updateIpAndStatistics(existIp, webVisitInfo, result): Promise<void> {
        const currentTime = Date.now();
        const visitNum = Number(existIp.ipNum);
    
        await this.ipRepo.update(existIp.id, {
            ipNum: visitNum + 1,
            updateTime: currentTime,
        });
    
        if (webVisitInfo) {
            await this.statisticsRepo.update(webVisitInfo.id, {
                pv: Number(webVisitInfo.pv) + 1,
                currentPv: result.currentPv,
                currentIp: result.currentIp,
            });
        }
    }
    async saveNewIpAndStatistics(ip: string, webVisitInfo, result): Promise<void> {
        const newIp: IpInterface = new Ip();
        newIp.ip = ip;
        newIp.ipNum = 1;
    
        await this.ipRepo.save(newIp);
    
        if (webVisitInfo) {
            await this.statisticsRepo.update(webVisitInfo.id, {
                ip: Number(webVisitInfo.ip) + 1,
                pv: Number(webVisitInfo.pv) + 1,
                currentPv: result.currentPv,
                currentIp: result.currentIp,
            });
        }
    }
    async getStatisticsInfo(params): Promise<any> {
        // 从2025年1月7日开始统计,时间戳 1736179200000
        let now = new Date().getTime();
        if (now < 1736179200000) return null;

        // 判断当前访问者 ip 是否在数据库中存在
        const existIp = await this.ipRepo.findOne({
            where: {ip: params.ip},
        });

        // 设置 PV 信息
        await this.setPvInfo();

        // 获取统计信息
        const [todayIp, todayPv, totalArticles, statisticsInfo] = await Promise.all([
            this.getTodayData('ip'),
            this.getTodayData('pv'),
            this.getAllArticleCount(),
            this.statisticsRepo.query(`
                SELECT ip, currentIp, pv, currentPv, uv, currentUv, id
                FROM statistic
            `)
        ]);
        if (statisticsInfo.length === 0){
            // 如果数据库还没有统计数据，初始化一条
            await this.statisticsRepo.save({
                ip: 1,
                currentIp: 1,
                pv: 1,
                currentPv: 1,
                uv: 1,
                currentUv: 1,
            });
        }
        const webVisitInfo = statisticsInfo[0];
        let result = {
            ...webVisitInfo,
            currentIp: todayIp.length,
            currentPv: todayPv[0]?.pvNum ? Number(todayPv[0]?.pvNum) + 1  :  1,
            totalArticles: totalArticles || 0,
        };

        if (existIp) {
             // 更新已存在 IP
             await this.updateIpAndStatistics(existIp, webVisitInfo, result);
            
        } else {
             // 保存新 IP 并更新统计
             await this.saveNewIpAndStatistics(params.ip, webVisitInfo, result);
        }
        return result;
    }

}
