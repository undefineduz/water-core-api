import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { isArray } from 'class-validator';

/**
 * Exception filter for handling HTTP exceptions.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    /**
     * Catches the HTTP exception and handles it.
     * @param exception - The HTTP exception to be caught.
     * @param host - The arguments host containing the request and response objects.
     */
    catch(exception, host: ArgumentsHost) {
        const ctx = host.switchToHttp();

        const { httpAdapter } = this.httpAdapterHost;
        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const messageData = exception.getResponse().message;
        const message = isArray(messageData) ? messageData[0] : messageData;

        const responseBody = {
            statusCode: httpStatus,
            message: message,
            timestamp: new Date().toLocaleString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}