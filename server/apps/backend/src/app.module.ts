import { Module } from '@nestjs/common';
import {DbModule} from '@libs/db/db.module';
import { UsersModule } from './users/users.module';
import {CommonModule} from '@common/common/common.module';
import { LinkModule } from './link/link.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { ArticleModule } from './article/article.module';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';
import { SiteConfigService } from './site-config/site-config.service';
import { SiteConfigController } from './site-config/site-config.controller';
import { SiteConfigModule } from './site-config/site-config.module';
import {CommentModule} from './comment/comment.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
      DbModule,
      CommonModule,
      UsersModule,
      LinkModule,
      CategoryModule,
      TagModule,
      ArticleModule,
      UploadModule,
      SiteConfigModule,
      CommentModule,
      StatisticsModule
  ],
  controllers: [UploadController, SiteConfigController],
  providers: [SiteConfigService],
})
export class AppModule {}
