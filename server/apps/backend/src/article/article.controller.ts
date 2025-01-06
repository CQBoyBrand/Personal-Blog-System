import {Body, Controller, HttpCode, Post, Put, UseGuards, Req} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {ArticleService} from './article.service';
import {Article} from '@libs/db/entity/article.entity';
import {ArticleCreateDto} from './dto/article.dto';

@ApiTags('文章')
@Controller('article')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService,
    ) {}

    @Post('addArticle')
    @ApiOperation({
        summary: '添加文章',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async addArticle(@Body() params: ArticleCreateDto, @Req() req: any): Promise<any> {
        const addArt = await this.articleService.addArticle({...params, authorId: req.user.id});
        return addArt;
    }

    @Put('editArticle')
    @ApiOperation({
        summary: '编辑文章',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async editArticle(@Body() params, @Req() req): Promise<any> {
        const editArt = await this.articleService.editArticle({...params, authorId: req.user.id});
        return editArt;
    }

    @Post('getArticleList')
    @ApiOperation({
        summary: '获取文章列表',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getArticleList(@Body() params, @Req() req): Promise<any> {
        const artList = await this.articleService.getArtList({...params, authorId: req.user.id});
        const artCount = await this.articleService.getArtCountByStatus({...params, authorId: req.user.id});

        const result = {
            list: artList,
            total: artCount,
        };

        return result;
    }

    @Post('getArticleListByTag')
    @ApiOperation({
        summary: '根据标签获取文章列表',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getArticleListByTag(@Body() params, @Req() req): Promise<any> {
        const artList = await this.articleService.getArtList({...params, authorId: req.user.id});
        const artCount = await this.articleService.getArtCount({...params, authorId: req.user.id});

        const result = {
            list: artList,
            total: artCount,
        };

        return result;
    }

    @Post('getArticleDetail')
    @ApiOperation({
        summary: '获取文章列表',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getArticleDetail(@Body() params, @Req() req): Promise<any> {
        const artDetail = await this.articleService.getArticleDetail({...params, authorId: req.user.id});
        return artDetail;
    }

    @Post('updateArtStatus')
    @ApiOperation({
        summary: '修改文章列表状态',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async updateArtStatus(@Body() params, @Req() req): Promise<any> {
        const artStatus = await this.articleService.deleteArticle({...params, authorId: req.user.id});

        return artStatus;
    }
}
