/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/7 11:42
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'int',
        comment: '用户 id',
    })
    id: number;

    @Column({
        type: 'text',
        comment: '用户名',
        nullable: false,
    })
    username: string;

    @Column({
        type: 'text',
        comment: '用户密码',
        select: false,
        nullable: false,
    })
    password: string;

    @Column({
        type: 'text',
        comment: '用户昵称',
        nullable: true,
    })
    nickname: string;

    @Column({
        type: 'text',
        comment: '用户头像',
        nullable: true,
    })
    avatar: string;

    @Column({
        type: 'text',
        comment: '用户签名',
        nullable: true,
    })
    signature: string;

    @Column({
        type: 'bigint',
        comment: '用户创建时间',
        nullable: false,
        default: new Date().getTime(),
    })
    cdate: number;

    @Column({
        type: 'int',
        comment: '用户权限,0是无权限，1是有权限',
        nullable: false,
        default: 0,
    })
    permissions: number;
}
