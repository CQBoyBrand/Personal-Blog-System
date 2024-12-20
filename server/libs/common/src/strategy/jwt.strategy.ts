/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/9 11:08
 * Description: 登录验证策略-本地验证
 */
import {PassportStrategy} from '@nestjs/passport';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '@libs/db/entity/user.entity';
import {Repository} from 'typeorm';
import {ExtractJwt, Strategy, StrategyOptions} from 'passport-jwt';

const md5 = require('md5');

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        } as StrategyOptions);
    }

    /**
     * 执行、验证策略
     */
    async validate(payload: any) {
        return await this.userRepository.findOne({
            where: {username: payload.username},
        });
    }
}
