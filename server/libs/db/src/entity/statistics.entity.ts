/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/7 11:42
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Statistic {
    @PrimaryGeneratedColumn({
        type: 'int',
        comment: 'id',
    })
    id: number;

    @Column({
        type: 'bigint',
        comment: '累计访问ip数',
        nullable: false,
        default: 0
    })
    ip: number;

    @Column({
        type: 'bigint',
        comment: '当天访问ip数',
        nullable: false,
        default: 0
    })
    currentIp: number;

    @Column({
        type: 'bigint',
        comment: '累计pv数',
        nullable: false,
        default: 0
    })
    pv: number;

    @Column({
        type: 'bigint',
        comment: '当天pv数',
        nullable: false,
        default: 0
    })
    currentPv: number;

    @Column({
        type: 'bigint',
        comment: '累计uv数',
        nullable: false,
        default: 0
    })
    uv: number;

    @Column({
        type: 'bigint',
        comment: '当天uv数',
        nullable: false,
        default: 0
    })
    currentUv: number;
}
