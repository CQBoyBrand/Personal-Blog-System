/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/10 21:03
 * Description:
 */
import {ApiProperty} from '@nestjs/swagger';

export class AdCreateDto {
    @ApiProperty()
    adName: string;
    @ApiProperty()
    adUrl: string;
    @ApiProperty()
    adImage: string;
    @ApiProperty()
    adDesc: string;
    @ApiProperty()
    adPosition: string;
}
