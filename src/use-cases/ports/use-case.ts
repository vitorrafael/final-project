export interface UseCase {
  execute(requestData: any): Promise<any>;
}
