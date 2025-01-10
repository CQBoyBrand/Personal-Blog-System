/**
 * 请求异常全局拦截器-统一封装返回请求失败数据
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const exceptionRes: any = exception.getResponse();
    const message = exceptionRes.message || exceptionRes.errmsg // exception.response.sqlMessage;
    const code = exceptionRes.statusCode || exceptionRes.errcode // exception.status;
    // Logger.log('错误提示', message);
    const errorResponse = {
      message: message || '请求失败',
      code:  code || 0,
      url: request.originalUrl, // 错误的url地址
    };
    const status =
        exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
