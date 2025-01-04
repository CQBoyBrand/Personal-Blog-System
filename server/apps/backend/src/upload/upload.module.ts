import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';

@Module({
  providers: [UploadService],
})
export class UploadModule {}
