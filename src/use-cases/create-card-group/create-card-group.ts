import { CardGroupRepository } from "../ports/card-group-repository";
import { UseCase } from "../ports/use-case";
import { CardGroup } from "../../entities/card-group/card-group";
import { CardGroupData } from "../ports/card-group";

export interface CreateCardGroupRequest {
  topic: string;
  description: string;
}

export class CreateCardGroup implements UseCase {
  constructor(private readonly cardGroupRepository: CardGroupRepository) {}

  public async execute(
    request: CreateCardGroupRequest
  ): Promise<CardGroupData> {
    const cardGroup = CardGroup.create({
      topic: request.topic,
      description: request.description,
    });

    return this.cardGroupRepository.add(cardGroup);
  }
}
