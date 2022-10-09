import { Request, Response } from "express";
import { Controller } from "../../controllers/controller";
import { HttpRequest } from "../../controllers/ports/http-request";

export class RouteAdapter {
  public static adapt(controller: Controller) {
    return async function (request: Request, response: Response) {
      const httpRequest: HttpRequest = {
        body: request.body,
      };
      const { statusCode, body } = await controller.handleRequest(httpRequest);
      response.status(statusCode).json(body);
    };
  }
}
