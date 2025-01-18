import {Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Article} from '@libs/db/entity/article.entity';
import {User} from '@libs/db/entity/user.entity';
import {ConfigModule} from '@nestjs/config';
import {Link} from '@libs/db/entity/link.entity';
import {Tag} from '@libs/db/entity/tag.entity';
import {Comment} from '@libs/db/entity/comment.entity';
import {Category} from '@libs/db/entity/category.entity';
import {Config} from '@libs/db/entity/config.entity';
import {Ip} from '@libs/db/entity/ip.entity';
import {Ad} from '@libs/db/entity/ad.entity';
import {Statistic} from '@libs/db/entity/statistics.entity';

const entityArr = [
    User,
    Article,
    Link,
    Tag,
    Comment,
    Category,
    Config,
    Ip,
    Ad,
    Statistic,
];

const entity = TypeOrmModule.forFeature(entityArr);
const ENV = process.env.NODE_ENV || process.env.DEV;
const envPath = ENV ? `.env.${ENV}` : '.env';
@Global()
@Module({
    imports: [
        entity,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: envPath,
        }),
        TypeOrmModule.forRootAsync({
            useFactory() {
                return {
                    type: 'mysql',
                    host: process.env.DATABASE_HOST,
                    port: Number(process.env.DATABASE_PORT),
                    username: process.env.DATABASE_USER,
                    password: process.env.DATABASE_PASSWORD,
                    database: process.env.DATABASE_NAME,
                    entities: entityArr,
                    synchronize: true,
                    charset: 'utf8mb4',
                };
            },
        }),
    ],
    providers: [],
    exports: [entity],
})
export class DbModule {
}
