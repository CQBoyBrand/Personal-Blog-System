import { NestFactory } from '@nestjs/core';
import {rateLimit} from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import {HttpExceptionFilter} from '@common/common/filters/http-exception.filter';
import {TransformInterceptor} from '@common/common/interface/transform.interceptor';
const ENV = process.env.NODE_ENV || process.env.DEV;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: ENV === "production" ? {
        origin: ['https://admintest.brandhuang.com', 'https://admin.brandhuang.com'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    } : true,
      // cors: true,
  });

  app.set('trust proxy', 'loopback');
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
      rateLimit({
        windowMs: 10 * 60 * 1000, // 10 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        message: "Too many requests from this IP, please try again later.",
        // legacyHeaders: true
      }),
  );
  await app.listen(process.env.ADMIN_PORT);
  console.log(`backend service is running at http://localhost:${process.env.ADMIN_PORT}`);
}
bootstrap();
