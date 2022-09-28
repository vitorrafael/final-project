import { CardGroup } from "../../entities/card-group/card-group";
import { CardGroupRepository } from "../ports/card-group-repository";
import { UseCase } from "../ports/use-case";

export interface UpdateCardRequest {
  id: string;
  description?: string;
  topic?: string;
}

export class UpdateCardGroup implements UseCase {
  constructor(private readonly cardGroupRepository: CardGroupRepository) {}

  public async execute(updateCardGroup: UpdateCardRequest) {
    const originalCardGroup = await this.cardGroupRepository.findCardGroupById(
      updateCardGroup.id
    );

    const mergedCardData = { ...originalCardGroup, ...updateCardGroup };

    const { topic, description } = mergedCardData;

    const updatedCardGroup = CardGroup.create(topic, description);

    if (
      this.shouldUpdateCardGroupTopic(updateCardGroup) &&
      !(await this.newCardGroupTopicAlreadyExists(updateCardGroup))
    ) {
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
    updatedCardGroup: UpdateCardRequest
  ): boolean {
    return Object.keys(updatedCardGroup).includes("description");
  }

  private shouldUpdateCardGroupTopic(
    updatedCardGroup: UpdateCardRequest
  ): boolean {
    return Object.keys(updatedCardGroup).includes("topic");
  }

  private async newCardGroupTopicAlreadyExists(
    updatedCardGroup: UpdateCardRequest
  ): Promise<boolean> {
    const potentialCardGroup =
      await this.cardGroupRepository.findCardGroupByTheme(
        updatedCardGroup.topic
      );
    return Boolean(potentialCardGroup);
  }
}
