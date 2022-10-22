import { CardGroup } from "../../entities/card-group/card-group";
import { CardGroupData } from "../ports/card-group";
import { CardGroupRepository } from "../ports/card-group-repository";
import { UseCase } from "../ports/use-case";
import { ERRORS } from "../utils/errors";

export interface UpdateCardGroupRequest {
  id: number;
  description?: string;
  topic?: string;
}

export class UpdateCardGroup
  implements UseCase<UpdateCardGroupRequest, CardGroupData>
{
  constructor(private readonly cardGroupRepository: CardGroupRepository) {}

  public async execute(
    updateCardGroup: UpdateCardGroupRequest
  ): Promise<CardGroupData> {
    const originalCardGroup = await this.cardGroupRepository.findCardGroupById(
      updateCardGroup.id
    );

    const mergedCardGroupData = {
      topic: updateCardGroup.topic || originalCardGroup.topic,
      description: updateCardGroup.description || originalCardGroup.topic,
    };

    const updatedCardGroup = CardGroup.create(
      mergedCardGroupData.topic,
      mergedCardGroupData.description
    );

    if (this.shouldUpdateCardGroupTopic(updateCardGroup)) {
      if (await this.newCardGroupTopicAlreadyExists(updateCardGroup)) {
        throw ERRORS["EXISTENT_CARD_GROUP"];
      }

      await this.cardGroupRepository.updateTopic(
        updateCardGroup.id,
        updatedCardGroup.topic
      );
    }

    if (this.shouldUpdateCardGroupDescription(updateCardGroup)) {
      await this.cardGroupRepository.updateDescription(
        updateCardGroup.id,
        updatedCardGroup.description
      );
    }

    return this.cardGroupRepository.findCardGroupById(updateCardGroup.id);
  }

  private shouldUpdateCardGroupDescription(
    updatedCardGroup: UpdateCardGroupRequest
  ): boolean {
    return Object.keys(updatedCardGroup).includes("description");
  }

  private shouldUpdateCardGroupTopic(
    updatedCardGroup: UpdateCardGroupRequest
  ): boolean {
    return Object.keys(updatedCardGroup).includes("topic");
  }

  private async newCardGroupTopicAlreadyExists(
    updatedCardGroup: UpdateCardGroupRequest
  ): Promise<boolean> {
    const potentialCardGroup =
      await this.cardGroupRepository.findCardGroupByTheme(
        updatedCardGroup.topic
      );
    return Boolean(potentialCardGroup);
  }
}
