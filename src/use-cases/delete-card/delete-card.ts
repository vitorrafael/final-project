import { CardData } from "../ports/card-data";
import { CardRepository } from "../ports/card-repository";
import { UseCase } from "../ports/use-case";

export interface DeleteCardRequest {
  id: string;
  front: string;
  back: string
}

export class DeleteCard implements UseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  public async execute(deleteCardRequest: DeleteCardRequest): Promise<void> {
    if (await this.cardRepository.exists(deleteCardRequest.front, deleteCardRequest.back)) {
      await this.cardRepository.delete(deleteCardRequest.id);
    } else {
      throw new Error();
    }
  }
}
