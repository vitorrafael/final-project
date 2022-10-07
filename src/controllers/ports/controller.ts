import { HttpRequest } from "./http-request";
import { HttpResponse } from "./http-response";

export interface Controller {
handleRequest(httpRequest: HttpRequest): Promise<HttpResponse<any>;
}
