import {Body, Controller, HttpCode, Post, UseGuards} from '@nestjs/common';
import {AdService} from './ad.service';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {AdInterface} from './interface/ad.interface';
import {AuthGuard} from '@nestjs/passport';
import {AdCreateDto} from './dto/ad.dto';

@ApiTags('广告管理')
@Controller('ad')
export class AdController {
    constructor(
       private readonly adService: AdService,
    ) {}

    @Post('createAd')
    @ApiOperation({
        summary: '添加广告',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async createAd(@Body() params: AdCreateDto): Promise<any> {
        const addLink = await this.adService.createAd(params);
        return addLink;
    }

    @Post('getAd')
    @ApiOperation({
        summary: '获取广告列表',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getAd(@Body() params): Promise<any> {
        const adList = await this.adService.getAdList(params);
        const adCount = await this.adService.getAdCount();

        const result = {
            list: adList,
            total: adCount,
        };

        return result;
    }

    @Post('editAd')
    @ApiOperation({
        summary: '编辑广告',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async editAd(@Body() params): Promise<AdInterface> {
        const editInfo = await this.adService.updateAd(params);
        return editInfo;
    }

    @Post('updateAdStatus')
    @ApiOperation({
        summary: '修改广告状态',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async updateAdStatus(@Body() params): Promise<AdInterface> {
        const delInfo = await this.adService.deleteAd(params);
        return delInfo;
    }

}
