/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/9 11:08
 * Description: 登录验证策略-本地验证
 */
import {PassportStrategy} from '@nestjs/passport';
import {IStrategyOptions, Strategy} from 'passport-local';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '@libs/db/entity/user.entity';
import {Repository} from 'typeorm';
import {BadRequestException} from '@nestjs/common';
import {CustomException} from '@common/common/common/http.decoration';

const md5 = require('md5');

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        } as IStrategyOptions);
    }

    /**
     * 执行、验证策略
     */
    async validate(username: string, password: string) {
        const loginPwd = md5(process.env.AUTH_PWD_SALT + password);
        const user = await this.userRepository.createQueryBuilder('user' ).where('user.username = :username', {
            username,
        }).addSelect('user.password').getOne();
        if (!user) {
            throw new CustomException('用户不存在');
        }
        if (loginPwd !== user.password) {
            throw new CustomException('密码不正确');
        }
        delete user.password;
        return user;

    }
}
