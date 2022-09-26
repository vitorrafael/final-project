import { Card } from "../../entities/card/card";
import { CardRepository } from "../ports/card-repository";

export interface UpdateCardRequest {
  id: string;
  front?: string;
  back?: string;
}

export class UpdateCard {
  constructor(private readonly cardRepository: CardRepository) {}

  public async update(updateCardData: UpdateCardRequest) {
    const originalCard = await this.cardRepository.findCardById(
      updateCardData.id
    );

    const mergedCardData = { ...originalCard, ...updateCardData };

    const updatedCard = Card.create(
      mergedCardData.groupId,
      mergedCardData.front,
      mergedCardData.back,
      mergedCardData.nextReviewDue,
      mergedCardData.reviewCount,
      mergedCardData.eFactor
    );

    let hasUpdatedCard = false;
    if (
      this.shouldUpdateCardFront(updateCardData) &&
      !(await this.newCardFrontAlreadyExists(updateCardData))
    ) {
      await this.cardRepository.updateCardFront(
        updateCardData.id,
        updatedCard.front
      );

      hasUpdatedCard = true;
    }

    if (this.shouldUpdateCardBack(updateCardData)) {
      await this.cardRepository.updateCardBack(
        updateCardData.id,
        updatedCard.back
      );

      hasUpdatedCard = true;
    }

    if (hasUpdatedCard) {
      await this.resetReviewInformation(updatedCard);
    }

    return this.cardRepository.findCardById(updateCardData.id);
  }

  private shouldUpdateCardFront(updateCardData: UpdateCardRequest): boolean {
    return Object.keys(updateCardData).includes("front");
  }

  private shouldUpdateCardBack(updateCardData: UpdateCardRequest): boolean {
    return Object.keys(updateCardData).includes("back");
  }

  private async newCardFrontAlreadyExists(
    updateCardData: UpdateCardRequest
  ): Promise<boolean> {
    const potentialCard = await this.cardRepository.findCardByFront(
      updateCardData.front
    );
    return Boolean(potentialCard);
  }

  private async resetReviewInformation(updatedCardData: Card): Promise<void> {
    return this.cardRepository.update({
      ...updatedCardData,
      reviewCount: 0,
      nextReviewDue: new Date(),
      eFactor: 2.5,
    });
  }
}
