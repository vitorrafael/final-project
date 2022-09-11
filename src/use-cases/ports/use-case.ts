export interface UseCase<RequestData, ResponseData> {
  execute(requestData: RequestData): Promise<ResponseData>;
}
