export class UseCaseWithErrorStub {
  public async execute(): Promise<never> {
    throw new Error("Error in the Use Case");
  }
}
