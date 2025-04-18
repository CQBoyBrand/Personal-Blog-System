import { NestFactory } from '@nestjs/core';
import { rateLimit } from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import {TransformInterceptor} from '@common/common/interface/transform.interceptor';
import {HttpExceptionFilter} from '@common/common/filters/http-exception.filter';
const ENV = process.env.NODE_ENV || process.env.DEV;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      cors: ENV === "production" ? {
          origin: ['https://www.brandhuang.com', 'https://brandhuang.com'],
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          preflightContinue: false,
          optionsSuccessStatus: 204,
      } : true,
      // cors: true,
  });
  app.set('trust proxy', 1);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
      rateLimit({
        windowMs: 10 * 60 * 1000, // 10 minutes
        max: 500, // limit each IP to 100 requests per windowMs
        message: "Too many requests from this IP, please try again later.",
        skip: (req) => {
          const whitelist = [process.env.SERVER_IP]; // 白名单IP
          const clientIP = req.ip || req.headers['x-forwarded-for']?.toString() || 'Unknown IP';
          return whitelist.includes(clientIP); // 如果IP在白名单中，跳过限制
        },
      }),
  );
  await app.listen(process.env.APP_PORT);
  console.log(`frontend service is running at http://localhost:${process.env.APP_PORT}`);
}
bootstrap();
