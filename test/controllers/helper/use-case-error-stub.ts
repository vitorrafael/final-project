export class UseCaseWithErrorStub {
  public async execute(request: any): Promise<any> {
    throw new Error("Error in the Use Case");
  }
}
