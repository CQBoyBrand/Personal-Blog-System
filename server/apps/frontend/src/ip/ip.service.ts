import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Ip} from '@libs/db/entity/ip.entity';
import { Statistic } from '@libs/db/entity/statistics.entity';
import {Repository} from 'typeorm';
import { IpInterface } from './interface/ip.interface';
import { StatisticsInterface } from '../statistics/interface/statistics.interface';
import { Pv } from '@libs/db/entity/pv.entity';

@Injectable()
export class IpService {
    constructor(
        @InjectRepository(Ip)
        private readonly IpRepo: Repository<Ip>,
        @InjectRepository(Statistic)
        private readonly StatisticRepo: Repository<Statistic>,
        @InjectRepository(Pv)
        private readonly PvRepo: Repository<Pv>,
    ) {}

    async setPvInfo() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 补零到两位
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const todayPv = await this.PvRepo.query(`
            SELECT * 
                FROM pv 
                WHERE updateTime >= UNIX_TIMESTAMP(CURDATE()) * 1000
                AND updateTime < UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY) * 1000;
        `);
        if (todayPv.length === 0) {
            const newPv: Pv = new Pv();
            newPv.pvNum = 1;
            newPv.cdate = formattedDate;
            newPv.updateTime = new Date().getTime();
            this.PvRepo.save(newPv);
        } else {
            this.PvRepo.update(todayPv[0].id, {
                pvNum: Number(todayPv[0].pvNum) + 1,
                updateTime: new Date().getTime(),
            });
        }
    }
    async setIpInfo(params): Promise<any> {

        // 从2025年1月7日开始统计,时间戳 1736179200000
        let now = new Date().getTime();
        if (now < 1736179200000) return null;
        const existIp = await this.IpRepo.findOne({
            where: {ip: params.ip},
        });
        const statisticsInfo = await this.StatisticRepo.query(`
                select
                id, ip, currentIp, pv, currentPv, uv, currentUv
                from statistic
            `);
        const webVisitInfo = statisticsInfo[0];
        if (statisticsInfo.length === 0){
            const newStatistics: StatisticsInterface = new Statistic();
            newStatistics.ip = 1;
            newStatistics.currentIp = 1;
            newStatistics.pv = 1;
            newStatistics.currentPv = 1;
            newStatistics.uv = 1;
            newStatistics.currentUv = 1;
            this.StatisticRepo.save(newStatistics);
        }

        this.setPvInfo();
        if (existIp) {
            const currentTime = new Date().getTime();
            const visitNum = Number(existIp.ipNum)
            return await this.IpRepo.update(existIp.id, {
                ipNum: visitNum + 1,
                updateTime: currentTime
            }).then(() => {
                if(webVisitInfo) {
                    this.StatisticRepo.update(webVisitInfo.id, {
                        pv: Number(webVisitInfo.pv) + 1,
                    });
                }
                return null;
            })
        } else {
            const newIp: IpInterface = new Ip();
            newIp.ip = params.ip;
            newIp.ipNum = 1;
            return await this.IpRepo.save(newIp).then(() => {
                if(webVisitInfo) {
                    this.StatisticRepo.update(webVisitInfo.id, {
                        ip: Number(webVisitInfo.ip) + 1,
                        pv: Number(webVisitInfo.pv) + 1,
                    });
                }
                return null;
            })
        }
    }
}

