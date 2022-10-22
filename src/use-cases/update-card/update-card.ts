import { Card } from "../../entities/card/card";
import { CardData } from "../ports/card-data";
import { CardRepository } from "../ports/card-repository";
import { UpdateCardRequest } from "../ports/requests";
import { UseCase } from "../ports/use-case";
import { ERRORS } from "../utils/errors";


export class UpdateCard implements UseCase<UpdateCardRequest, CardData> {
  constructor(private readonly cardRepository: CardRepository) {}

  public async execute(updateCardData: UpdateCardRequest): Promise<CardData> {
    const originalCard = await this.cardRepository.findCardById(
      updateCardData.id
    );

    const mergedCardData = {
      groupId: originalCard.groupId,
      nextReviewDue: originalCard.nextReviewDue,
      reviewCount: originalCard.reviewCount,
      eFactor: originalCard.eFactor,

      front: updateCardData.front || originalCard.front,
      back: updateCardData.back || originalCard.back,
    };

    const updatedCard = Card.create(
      mergedCardData.groupId,
      mergedCardData.front,
      mergedCardData.back,
      mergedCardData.nextReviewDue,
      mergedCardData.reviewCount,
      mergedCardData.eFactor
    );

    let hasUpdatedCard = false;
    if (this.shouldUpdateCardFront(updateCardData)) {
      if (await this.newCardFrontAlreadyExists(updateCardData)) {
        throw ERRORS["EXISTENT_CARD"];
      }

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
