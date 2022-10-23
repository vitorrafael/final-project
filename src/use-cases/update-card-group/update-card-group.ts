import { CardGroup } from "../../entities/card-group/card-group";
import { CardGroupData } from "../ports/card-group-data";
import { CardGroupRepository } from "../ports/card-group-repository";
import { UpdateCardGroupRequest } from "../ports/requests";
import { UseCase } from "../ports/use-case";
import { ERRORS } from "../utils/errors";

// Coupling = 2 - CardGroup and Error
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

    const mergedCardGroupData = this.mergeCardGroups(
      updateCardGroup,
      originalCardGroup
    );

    const updatedCardGroup = CardGroup.create(
      mergedCardGroupData.topic,
      mergedCardGroupData.description
    );

    if (this.shouldUpdateCardGroupTopic(updateCardGroup)) {
      await this.handleUpdateCardGroupTopic(updateCardGroup, updatedCardGroup);
    }

    if (this.shouldUpdateCardGroupDescription(updateCardGroup)) {
      await this.cardGroupRepository.updateDescription(
        updateCardGroup.id,
        updatedCardGroup.description
      );
    }

    return this.cardGroupRepository.findCardGroupById(updateCardGroup.id);
  }

  private mergeCardGroups(
    updateCardGroup: UpdateCardGroupRequest,
    originalCardGroup: CardGroupData
  ): CardGroupData {
    return {
      topic: updateCardGroup.topic || originalCardGroup.topic,
      description: updateCardGroup.description || originalCardGroup.topic,
    };
  }

  private async handleUpdateCardGroupTopic(
    updateCardGroup: UpdateCardGroupRequest,
    updatedCardGroup: CardGroup
  ) {
    if (await this.newCardGroupTopicAlreadyExists(updateCardGroup)) {
      throw ERRORS["EXISTENT_CARD_GROUP"];
    }

    await this.cardGroupRepository.updateTopic(
      updateCardGroup.id,
      updatedCardGroup.topic
    );
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
