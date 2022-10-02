import { SuperMemoAlgorithm } from "../../entities/super-memo/super-memo-algorithm";
import { CardRepository } from "../ports/card-repository";
import { UseCase } from "../ports/use-case";

export interface SubmitReviewRequest {
  id: string;
  front: string;
  responseQuality: number;
}

export class SubmitReview implements UseCase {
  constructor(
    private cardRepository: CardRepository,
    private algorithm: SuperMemoAlgorithm
  ) {}
  public async execute(
    submitReviewRequest: SubmitReviewRequest
  ): Promise<void> {
    const card = await this.cardRepository.findCardByFront(
      submitReviewRequest.front
    );

    const { eFactor, intervalForNextReview } = this.algorithm.execute(
      submitReviewRequest.responseQuality,
      card.eFactor,
      card.reviewCount
    );

    const nextReviewDue = this.calculateNextReviewDueDate(
      card.nextReviewDue,
      intervalForNextReview
    );

    await this.cardRepository.update({
      ...card,
      eFactor,
      reviewCount: card.reviewCount + 1,
      nextReviewDue,
    });
  }

  private calculateNextReviewDueDate(
    currentReviewDate: Date,
    intervalForNextReview: number
  ): Date {
    const tempDate = new Date(currentReviewDate);
    tempDate.setDate(currentReviewDate.getDate() + intervalForNextReview);
    return tempDate;
  }
}
