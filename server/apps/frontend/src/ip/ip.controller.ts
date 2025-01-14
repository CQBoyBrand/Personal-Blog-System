import {Controller, HttpCode, Post, Req} from '@nestjs/common';
import {ApiOperation} from '@nestjs/swagger';
import {IpService} from './ip.service';

@Controller('visit')
export class IpController {
    constructor(
        private readonly ipService: IpService,
    ) {
    }
    @Post('/setVisitInfo')
    @ApiOperation({
        summary: '获取客户端访问信息',
    })
    @HttpCode(200)
    async getVisitInfo(@Req() req): Promise<any> {
        const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'Unknown IP';
        const userAgent = req.headers['user-agent'] || '';
        const crawlerRegex = /bot|crawl|spider|slurp|google|bing|yahoo|baidu|duckduckbot|yandex|sogou|exabot|facebot|ia_archiver/i;
        if (crawlerRegex.test(userAgent) || ip === process.env.SERVER_IP) {
            return null;
        }
        return await this.ipService.setIpInfo({ip});
    }
}
