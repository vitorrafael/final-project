import { SuperMemoAlgorithm } from "../../entities/super-memo/super-memo-algorithm";
import { CardRepository } from "../create-card/ports/card-repository";

export class SubmitReview {
   constructor(
    private cardRepository: CardRepository,
    private algorithm: SuperMemoAlgorithm
  ) {}
  public async submitReviewResults({
    cardFront,
    responseQuality,
  }: {
    cardFront: string;
    responseQuality: number;
  }): Promise<void> {
    const card = await this.cardRepository.findCardByFront(cardFront);

    const { eFactor, intervalForNextReview } =
      this.algorithm.calculateNextReview(
        responseQuality,
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
    const tempDate = new Date();
    tempDate.setDate(currentReviewDate.getDate() + intervalForNextReview);
    return tempDate;
  } 
}