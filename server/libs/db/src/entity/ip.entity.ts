/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/7 11:42
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Ip {
    @PrimaryGeneratedColumn({
        type: 'int',
        comment: 'id',
    })
    id: number;

    @Column({
        type: 'text',
        comment: 'ip',
        nullable: false,
    })
    ip: string;

    @Column({
        type: 'bigint',
        comment: '该ip访问的次数',
        nullable: false,
    })
    ipNum: number;

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
