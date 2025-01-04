import {Controller, Body, HttpCode, Post, UseGuards, Req, UploadedFile, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {UploadDto} from './dto/upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
const ImageKit = require('imagekit');

@Controller('upload')
export class UploadController {
    @Post('upload')
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @UseInterceptors(FileInterceptor('file'))
    async uploadMedia(@Body() params: UploadDto, @UploadedFile() file): Promise<any> {
        // 创建上传凭证
        var imagekit = new ImageKit({
            publicKey : process.env.publicKey,
            privateKey : process.env.privateKey,
            urlEndpoint : process.env.urlEndpoint
        });
        const res = await imagekit.upload({
            file: file.buffer,
            fileName: params.fileName,
            useUniqueFileName: false,
            folder: `/blog-image-folder/${params.type}`
        })
        return res;
    }
}
