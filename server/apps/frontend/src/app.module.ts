import { Module } from '@nestjs/common';
import {DbModule} from '@libs/db/db.module';
import {CommonModule} from '@common/common/common.module';
import { ArticleModule } from './article/article.module';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { LinkModule } from './link/link.module';
import { SiteConfigModule } from './site-config/site-config.module';
import { IpModule } from './ip/ip.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    DbModule,
    CommonModule,
    ArticleModule,
    TagModule,
    CategoryModule,
    CommentModule,
    LinkModule,
    SiteConfigModule,
    IpModule,
    StatisticsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
