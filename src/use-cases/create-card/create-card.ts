import { Card } from "../../entities/card/card";
import { CardData } from "../ports/card-data";
import { CardGroupData } from "../ports/card-group";
import { CardGroupRepository } from "../ports/card-group-repository";
import { CardRepository } from "../ports/card-repository";
import { UseCase } from "../ports/use-case";
import { CONSTANTS } from "../utils/constants";
import { ERRORS } from "../utils/errors";

export interface CreateCardRequest {
  front: string;
  back: string;
  groupId: string;
}

export class CreateCard implements UseCase {
  constructor(
    private readonly cardRepository: CardRepository,
    private readonly cardGroupRepository: CardGroupRepository
  ) {}

  public async execute(
    createCardRequest: CreateCardRequest
  ): Promise<CardData> {
    const cardGroup = await this.getCardGroup(createCardRequest.groupId);

    const card = Card.create(
      cardGroup.id,
      createCardRequest.front,
      createCardRequest.back,
      new Date(),
      0,
      CONSTANTS.INITIAL_E_FACTOR
    );

    const isCardAlreadyCreated = await this.cardRepository.exists(
      card.front,
      card.back
    );
    if (isCardAlreadyCreated) {
      throw ERRORS["EXISTENT_CARD"];
    }

    await this.cardRepository.add({
      front: card.front,
      back: card.back,
      eFactor: card.eFactor,
      nextReviewDue: card.nextReviewDue,
      reviewCount: card.reviewCount,
      groupId: card.groupId,
    });

    const persistedCard = await this.cardRepository.findCardByFront(card.front);

    return persistedCard;
  }

  private getCardGroup(id: string): Promise<CardGroupData> {
    if (!id) {
      return this.cardGroupRepository.findCardGroupByTheme(
        CONSTANTS.DEFAULT_CARD_GROUP_THEME
      );
    } else {
      return this.cardGroupRepository.findCardGroupById(id);
    }
  }
}
