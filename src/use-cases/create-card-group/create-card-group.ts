import { CardGroupRepository } from "../ports/card-group-repository";
import { UseCase } from "../ports/use-case";
import { CardGroup } from "../../entities/card-group/card-group";
import { CardGroupData } from "../ports/card-group-data";
import { ERRORS } from "../utils/errors";
import { CreateCardGroupRequest } from "../ports/requests";


export class CreateCardGroup
  implements UseCase<CreateCardGroupRequest, CardGroupData>
{
  constructor(private readonly cardGroupRepository: CardGroupRepository) {}

  public async execute(
    request: CreateCardGroupRequest
  ): Promise<CardGroupData> {
    const { topic, description } = request;

    if (await this.cardGroupRepository.findCardGroupByTheme(topic)) {
      throw ERRORS["EXISTENT_CARD_GROUP"];
    }

    const cardGroup = CardGroup.create(topic, description);

    return this.cardGroupRepository.add(cardGroup);
  }
}
