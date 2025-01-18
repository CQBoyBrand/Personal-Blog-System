/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/7 11:42
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Ad {
    @PrimaryGeneratedColumn({
        type: 'int',
        comment: 'id',
    })
    id: number;

    @Column({
        type: 'text',
        comment: '广告名字',
        nullable: false,
    })
    adName: string;

    @Column({
        type: 'text',
        comment: '广告链接',
        nullable: false,
    })
    adUrl: string;

    @Column({
        type: 'text',
        comment: '广告图片',
        nullable: false,
    })
    adImage: string;

    @Column({
        type: 'text',
        comment: '广告描述',
        nullable: false,
    })
    adDesc: string;

    @Column({
        type: 'text',
        comment: '广告位置',
        nullable: false,
    })
    adPosition: string;

    @Column({
        type: 'int',
        comment: '广告状态,0:未启用,1:启用',
        default: 0,
        nullable: false,
    })
    status: number;

    @Column({
        type: 'bigint',
        comment: '创建时间',
        nullable: false,
        default: new Date().getTime(),
    })
    cdate: number;

    @Column({
        type: 'bigint',
        comment: '更新时间',
        nullable: false,
        default: new Date().getTime(),
    })
    updateTime: number;
}
