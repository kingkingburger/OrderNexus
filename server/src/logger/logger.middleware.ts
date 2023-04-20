// core
import { Injectable, NestMiddleware } from "@nestjs/common";

// logger
import { LoggerService } from "./logger.service";

// lib
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const loggerService = new LoggerService(req.url.slice(1).split("/")[req.url.slice(1).split("/").length - 1]);
    const tempUrl = req.method + " " + req.url.split("?")[0];
    const _headers = req.headers ? req.headers : {};
    const _query = req.query ? req.query : {};
    const _body = req.body ? req.body : {};
    const _url = tempUrl ? tempUrl : {};

    loggerService.info(
      JSON.stringify({
        url: _url,
        headers: _headers,
        query: _query,
        body: _body
      })
    );

    next();
  }
}
