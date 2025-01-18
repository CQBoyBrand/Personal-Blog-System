import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {AdService} from './ad.service';
import { ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('广告管理')
@Controller('ad')
export class AdController {
    constructor(
       private readonly adService: AdService,
    ) {}

    @Post('getAd')
    @ApiOperation({
        summary: '获取广告列表',
    })
    @HttpCode(200)
    async getAd(@Body() params): Promise<any> {
        const adList = await this.adService.getAdList(params);
        const adCount = await this.adService.getAdCount();

        const result = {
            list: adList,
            total: adCount,
        };

        return result;
    }

}
