import { expect } from "chai";
import { CreateCardController } from "../../src/controllers/create-card-controller";
import { UseCaseWithErrorStub } from "./helper/use-case-error-stub";

describe("CreateCardController", () => {
  it("should return 500 if an error was thrown", async () => {
    const useCaseWithError = new UseCaseWithErrorStub();
    const controller = new CreateCardController(useCaseWithError);

    const response = await controller.handleRequest({});

    expect(response.statusCode).to.be.equal(500);
  });
});
