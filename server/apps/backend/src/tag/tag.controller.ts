import {Body, Controller, HttpCode, Post, UseGuards, Req} from '@nestjs/common';
import {CategoryService} from '../category/category.service';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {TagService} from './tag.service';

@ApiTags('标签')
@Controller('tag')
export class TagController {
    constructor(
        private readonly tagService: TagService,
    ) {}

    @Post('addTag')
    @ApiOperation({
        summary: '添加标签',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async addCategory(@Body() params,  @Req() req): Promise<any> {
        const newTag = await this.tagService.addTag({...params, authorId: req.user.id});
        return newTag;
    }

    @Post('getTag')
    @ApiOperation({
        summary: '获取标签列表',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getTag(@Body() params,  @Req() req): Promise<any> {
        const tagList = await this.tagService.getTagList({...params, authorId: req.user.id});
        const tagCount = await this.tagService.getTagCount();

        const result = {
            list: tagList,
            total: tagCount,
        };

        return result;
    }

    @Post('getAllTagPublished')
    @ApiOperation({
        summary: '获取所有已发布标签',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getAllTagPublished(@Body() params,  @Req() req): Promise<any> {
        const allTagList = await this.tagService.getAllTagPublished({...params, authorId: req.user.id});

        return allTagList;
    }

    @Post('editTag')
    @ApiOperation({
        summary: '编辑标签',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async editCategory(@Body() params,  @Req() req): Promise<any> {
        const editTag = await this.tagService.editTag({...params, authorId: req.user.id});

        return editTag;
    }

    @Post('delTag')
    @ApiOperation({
        summary: '删除标签',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async delCategory(@Body() params,  @Req() req): Promise<any> {
        const delTag = await this.tagService.delTag({...params, authorId: req.user.id});

        return delTag;
    }
}
