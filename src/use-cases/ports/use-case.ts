export interface UseCase<Request, Response> {
  execute(requestData: Request): Promise<Response>;
}
