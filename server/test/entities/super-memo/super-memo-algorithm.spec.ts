import { expect } from "chai";
import { SuperMemoAlgorithm } from "../../../src/entities/super-memo/super-memo-algorithm";

describe("[Entity] SuperMemoAlgorithm", async () => {
  const superMemoAlgorithm = new SuperMemoAlgorithm();

  it("Should reset the interval for review if the response quality is less than 3", () => {
    const responseQuality = 2;
    const eFactor = 3;
    const currentInterval = 10;

    const algorithmResponse = superMemoAlgorithm.execute(
      responseQuality,
      eFactor,
      currentInterval
    );

    expect(algorithmResponse.eFactor).to.be.equal(eFactor);
    expect(algorithmResponse.intervalForNextReview).to.be.equal(1);
  });

  it("Should set eFactor to 1.3 if the calculated eFactor is less than 1.3", () => {
    const responseQuality = 3;
    const eFactor = 1.2;
    const currentInterval = 3;

    const algorithmResponse = superMemoAlgorithm.execute(
      responseQuality,
      eFactor,
      currentInterval
    );

    expect(algorithmResponse.eFactor).to.be.equal(1.3);
    expect(algorithmResponse.intervalForNextReview).to.be.equal(
      currentInterval + 1
    );
  });

  it("Should calculate and set the eFactor correctly if it is not less than 1.3", () => {
    const responseQuality = 5;
    const eFactor = 2.25;
    const currentInterval = 3;

    const algorithmResponse = superMemoAlgorithm.execute(
      responseQuality,
      eFactor,
      currentInterval
    );

    expect(algorithmResponse.eFactor).to.be.equal(2.35);
  });

  it("Should calculate and set the nextIntervalForReview correctly if it is at least the third review", () => {
    const responseQuality = 5;
    const eFactor = 2.25;
    const currentInterval = 3;

    const algorithmResponse = superMemoAlgorithm.execute(
      responseQuality,
      eFactor,
      currentInterval
    );

    expect(algorithmResponse.intervalForNextReview).to.be.equal(7);
  });

  it("Should return pre-defined interval 6 if it is the second review", () => {
    const responseQuality = 5;
    const eFactor = 2.25;
    const currentInterval = 2;

    const algorithmResponse = superMemoAlgorithm.execute(
      responseQuality,
      eFactor,
      currentInterval
    );

    expect(algorithmResponse.intervalForNextReview).to.be.equal(6);
  });

  it("Should return pre-defined interval 1 if it is at least the first review", () => {
    const responseQuality = 5;
    const eFactor = 2.25;
    const currentInterval = 1;

    const algorithmResponse = superMemoAlgorithm.execute(
      responseQuality,
      eFactor,
      currentInterval
    );

    expect(algorithmResponse.intervalForNextReview).to.be.equal(1);
  });
});
