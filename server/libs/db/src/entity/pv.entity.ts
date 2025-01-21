/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/7 11:42
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Pv {
    @PrimaryGeneratedColumn({
        type: 'int',
        comment: 'id',
    })
    id: number;

    @Column({
        type: 'bigint',
        comment: '访问的次数',
        nullable: false,
    })
    pvNum: number;

    @Column({
        type: 'text',
        comment: '创建日期',
        nullable: false,
    })
    cdate: string;

    @Column({
        type: 'bigint',
        comment: '更新时间',
        nullable: false,
        default: new Date().getTime(),
    })
    updateTime: number;
}
