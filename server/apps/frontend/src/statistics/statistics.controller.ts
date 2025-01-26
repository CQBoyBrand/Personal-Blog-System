import {Controller, HttpCode, Post, Req} from '@nestjs/common';
import {ApiOperation} from '@nestjs/swagger';
import {StatisticsService} from './statistics.service';

@Controller('statistics')
export class StatisticsController {
    constructor(
        private readonly StatisticsService: StatisticsService,
    ) {
    }
    @Post('statisticsInfo')
    @ApiOperation({
        summary: '获取统计信息',
    })
    @HttpCode(200)
    async getStatisticsInfo(@Req() req): Promise<any> {
        const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'Unknown IP';
        const userAgent = req.headers['user-agent'] || '';
        const crawlerRegex = /node|bot|crawl|spider|slurp|google|bing|yahoo|baidu|duckduckbot|yandex|sogou|exabot|facebot|ia_archiver/i;
        if (crawlerRegex.test(userAgent) || ip === process.env.SERVER_IP) {
            return null;
        }
        const statisticsInfo = await this.StatisticsService.getStatisticsInfo({ip});
        return statisticsInfo;
    }
}
