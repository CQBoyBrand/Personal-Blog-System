import {Controller, HttpCode, Post} from '@nestjs/common';
import {ApiOperation} from '@nestjs/swagger';
import {StatisticsService} from './statistics.service';

@Controller('sticstatis')
export class StatisticsController {
    constructor(
        private readonly StatisticsService: StatisticsService,
    ) {
    }
    @Post('getStatisticsInfo')
    @ApiOperation({
        summary: '获取统计信息',
    })
    @HttpCode(200)
    async getStatisticsInfo(): Promise<any> {
        const statisticsInfo = await this.StatisticsService.getStatisticsInfo();
        return statisticsInfo;
    }
}
