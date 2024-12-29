/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/11 18:36
 * Description:
 */
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn({
        type: 'int',
        comment: 'id',
    })
    id: number;
    
    @Column({
        type: 'int',
        comment: '作者',
        nullable: false,
    })
    authorId: number;

    @Column({
        type: 'text',
        comment: '标签名称',
        nullable: false,
    })
    tagname: string;

    @Column({
        type: 'text',
        comment: '标签描述',
        nullable: false,
    })
    tagdesc: string;

    @Column({
        type: 'int',
        comment: '标签状态, 1-可用，0-不可用',
        nullable: true,
        default: 0,
    })
    status: number;

    @Column({
        type: 'bigint',
        comment: '创建时间',
        nullable: false,
        default: new Date().getTime(),
    })
    cdate: number;
}
