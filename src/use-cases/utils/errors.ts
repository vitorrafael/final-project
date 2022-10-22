import { UseCaseError } from "./use-case-error";
import { Errors as ErrorNames } from "../ports/errors";

export const ERRORS: { [key in ErrorNames]: UseCaseError } = {
  EXISTENT_CARD: new UseCaseError(
    ErrorNames.EXISTENT_CARD,
    "Card already exists"
  ),
  EXISTENT_CARD_GROUP: new UseCaseError(
    ErrorNames.EXISTENT_CARD_GROUP,
    "Card group already exists"
  ),
  UNEXISTENT_CARD: new UseCaseError(
    ErrorNames.UNEXISTENT_CARD,
    "Unexistent card"
  ),
  UNEXISTENT_CARD_GROUP: new UseCaseError(
    ErrorNames.UNEXISTENT_CARD_GROUP,
    "Unexistent card group"
  ),
};
