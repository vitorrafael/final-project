export interface SuperMemoAlgorithmResponse {
  eFactor: number;
  intervalForNextReview: number;
}

export class SuperMemoAlgorithm {
  public execute(
    responseQuality: number,
    eFactor: number,
    currentInterval: number
  ): SuperMemoAlgorithmResponse {
    if (responseQuality < 3) {
      return {
        eFactor,
        intervalForNextReview: 1,
      };
    } else {
      const nextInterval = this.getNextInterval(eFactor, currentInterval);
      const newEFactor = this.calculateEFactor(eFactor, responseQuality);

      return {
        eFactor: newEFactor < 1.3 ? 1.3 : newEFactor,
        intervalForNextReview: nextInterval,
      };
    }
  }

  private getNextInterval(eFactor: number, currentInterval: number): number {
    if (currentInterval === 1) return 1;
    if (currentInterval === 2) return 6;

    return Math.round(currentInterval * eFactor);
  }

  private calculateEFactor(
    currentEFactor: number,
    responseQuality: number
  ): number {
    return (
      currentEFactor +
      (0.1 - (5 - responseQuality) * (0.08 + (5 - responseQuality) * 0.02))
    );
  }
}
