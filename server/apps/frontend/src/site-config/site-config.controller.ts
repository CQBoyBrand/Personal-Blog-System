import {Controller, Get, HttpCode, Header, Res} from '@nestjs/common';
import {SiteConfigService} from './site-config.service';
import {ApiOperation} from '@nestjs/swagger';

@Controller('config')
export class SiteConfigController {
    constructor(
        private readonly configService: SiteConfigService,
    ) {}

    @Get('getSiteConfig')
    @ApiOperation({
        summary: '获取友链列表',
    })
    @HttpCode(200)
    async getSiteConfig(): Promise<any> {
        const siteConfig = await this.configService.getConfig();
        return siteConfig;
    }

    @Get('rss.xml')
    @ApiOperation({
        summary: 'rss',
    })
    @Header('Content-Type', 'application/xml')
    @HttpCode(200)
    async getRss(@Res() res: any): Promise<any> {
        const rss = await this.configService.generateRSS();
        res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
        res.send(rss);
    }

    @Get('sitemap.xml')
    @ApiOperation({
        summary: 'sitemap',
    })
    @Header('Content-Type', 'application/xml')
    @HttpCode(200)
    async getSitemap(@Res() res: any): Promise<any> {
        const sitemap = await this.configService.generateSitemap();
      res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
      res.send(sitemap);
    }
}
