import { Card, CardData } from "../../entities/card/card";
import { CardRepository } from "../ports/card-repository";

export class CreateCard {
  constructor(private readonly cardRepository: CardRepository) {}

  public async createCard(cardData: CardData): Promise<Card> {
    const card = Card.create(cardData);

    const isCardAlreadyCreated = await this.cardRepository.exists(
      card.front,
      card.back
    );
    if (isCardAlreadyCreated) {
      throw new Error("Card already exists");
    }

    await this.cardRepository.add({
      front: card.front,
      back: card.back,
      eFactor: card.eFactor,
      nextReviewDue: card.nextReviewDue,
      reviewCount: card.reviewCount
    });

		return card;
  }
}
