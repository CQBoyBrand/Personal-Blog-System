import {Body, Controller, Get, HostParam, HttpCode, Ip, Post, Req, Headers} from '@nestjs/common';
import {ArticleService} from './article.service';
import {ApiOperation} from '@nestjs/swagger';

@Controller('article')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService,
    ) {}

    @Post('getArticleListAll')
    @ApiOperation({
        summary: '获取文章列表',
    })
    @HttpCode(200)
    async getArticleListAll(@Body() params): Promise<any> {
      
        const artList = await this.articleService.getArticleListAll(params);
        return artList;
    }

    @Post('getArtByType')
    @ApiOperation({
        summary: '根据导航栏-获取文章列表',
    })
    @HttpCode(200)
    async getArticleListByType(@Body() params): Promise<any> {
        const artList = await this.articleService.getArtListByType(params);
        return artList;
    }

    @Post('getArticleListByTag')
    @ApiOperation({
        summary: '根据标签-获取文章列表',
    })
    @HttpCode(200)
    async getArticleListByTag(@Body() params): Promise<any> {
        const artList = await this.articleService.getArtListByTag(params);
        return artList;
    }

    @Post('getArtByCategory')
    @ApiOperation({
        summary: '根据分类-获取文章列表',
    })
    @HttpCode(200)
    async getArtByCategory(@Body() params): Promise<any> {
        const artList = await this.articleService.getArtListByCategory(params);
        return artList;
    }

    @Post('getArtByKeyword')
    @ApiOperation({
        summary: '根据关键词-获取文章列表',
    })
    @HttpCode(200)
    async getArtByKeyword(@Body() params): Promise<any> {
        const artList = await this.articleService.getArtListByKeywords(params);
        return artList;
    }

    @Post('getArticleDetail')
    @ApiOperation({
        summary: '获取文章详情',
    })
    @HttpCode(200)
    async getArticleDetail(@Body() params, @Req() req, @Ip() ip, @HostParam() HostParam, @Headers() headers): Promise<any> {
        // console.log("req-headers=",req.headers)
        // console.log("req-socket=",req.socket)
        // console.log("req-ip=",req.ip)
        // console.log("ip=",ip)
        // console.log("headers=",headers)
        // console.log("HostParam=",HostParam)
        const artDetail = await this.articleService.getArticleDetail(params);
        return artDetail;
    }

    @Post('getArchive')
    @ApiOperation({
        summary: '文章归档',
    })
    @HttpCode(200)
    async getArchive(): Promise<any> {
        const archiveList = await this.articleService.getArchive();
        return archiveList;
    }

    @Get('getArticleHot')
    @ApiOperation({
        summary: '获取热门文章',
    })
    @HttpCode(200)
    async getArticleHot(): Promise<any> {
        const artHotList = await this.articleService.getHotArticleList();

        return artHotList;
    }
}
