import { CardGroupRepository } from "../ports/card-group-repository";
import { UseCase } from "../ports/use-case";
import { CardGroup } from "../../entities/card-group/card-group";
import { CardGroupData } from "../ports/card-group";

export interface CreateCardGroupRequest {
  topic: string;
  description: string;
  tags: string[];
}

export class CreateCardGroup
  implements UseCase<CreateCardGroupRequest, CardGroupData>
{
  constructor(private readonly cardGroupRepository: CardGroupRepository) {}

  public async execute(
    request: CreateCardGroupRequest
  ): Promise<CardGroupData> {
    const cardGroup = CardGroup.create({
      topic: request.topic,
      description: request.description,
      tags: request.tags,
    });

    return this.cardGroupRepository.add(cardGroup);
  }
}
