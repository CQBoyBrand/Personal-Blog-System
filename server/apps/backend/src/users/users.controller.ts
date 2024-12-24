import {Body, Controller, Get, HttpCode, Post, Put, Req, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {UserLoginDto, UserRegisterDto} from './dto/user.dto';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import {UserGetInterface} from './interface/user.interface';

@ApiTags('用户')
@Controller('user')
export class UsersController {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
    ) {}

    @Post('register')
    @ApiOperation({
        summary: '注册',
    })
    @HttpCode(200)
    async register(@Body() params: UserRegisterDto): Promise<object> {
        const resData =  await this.userService.userRegister(params);
        return resData;
    }

    @Post('login')
    @ApiOperation({
        summary: '登录',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('local'))
    async login(@Body() params: UserLoginDto, @Req() req): Promise<object> {
        const payload = {username: req.user.username, sub: req.user.id, permissions: req.user.permissions};
        const token = this.jwtService.sign(payload);

        const user = req.user;
        user.token = token;
        return user;
    }

    @Get('getUserInfo')
    @ApiOperation({
        summary: '获取用户信息',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getUserInfo(@Body() params, @Req() req): Promise<UserGetInterface> {
        return req.user;
    }

    @Put('updateUserInfo')
    @ApiOperation({
        summary: '更新用户信息',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('local'))
    @ApiBearerAuth()
    async updateUserInfo(@Body() params, @Req() req): Promise<UserGetInterface> {
        const resData =  await this.userService.userInfoUpdate(params, req.user.id);
        return resData;
    }
}
