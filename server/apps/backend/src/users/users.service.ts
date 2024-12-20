import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '@libs/db/entity/user.entity';
import {Repository} from 'typeorm';
import {CustomException} from '@common/common/common/http.decoration';

const md5 = require('md5');

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async userRegister({username, password}): Promise<any> {
        console.log("userRegister=", username, password);
        const pwd = md5(process.env.AUTH_PWD_SALT + password);

        const oldUser = await this.userRepository.findOne({
            where: {username},
        });
        if (oldUser) {
            throw new BadRequestException('用户已存在');
        } else {
            const  newUser = new User();
            newUser.username = username;
            newUser.nickname = '新用户' + new Date().getTime();
            newUser.password = pwd;
            return await this.userRepository.save(newUser).then(() => {
                return '添加用户成功';
            }).catch(() => {
                throw new CustomException('添加失败');
            });
        }
    }

    async userInfoUpdate(params, userId): Promise<any> {
        const pwd = md5(process.env.AUTH_PWD_SALT + params.newpass);
        const updateInfo = {
            nickname: params.nickname,
            signature: params.signature,
            avatar: params.avatar,
            password: pwd,
        };
        if (!params.newpass) {
            delete updateInfo.password;
        }
        return await this.userRepository.update(userId, updateInfo).then(() => {
            return '操作成功';
        }).catch( () => {
            throw new CustomException('操作失败');
        });
    }
}
