import { Router } from "express";
import { CreateCardController } from "../../controllers/create-card-controller";
import { DeleteCardController } from "../../controllers/delete-card-controller";
import { SubmitReviewController } from "../../controllers/submit-review-controller";
import { UpdateCardController } from "../../controllers/update-card-controller";
import { RouteAdapter } from "../adapters/route-adapter";
import { CreateCardFactory } from "../factories/use-cases/create-card-factory";
import { DeleteCardFactory } from "../factories/use-cases/delete-card-factory";
import { SubmitReviewFactory } from "../factories/use-cases/submit-review-factory";
import { UpdateCardFactory } from "../factories/use-cases/update-card-factory";

export function setupCardRoutes(router: Router) {
  const createCard = CreateCardFactory.make();
  const deleteCard = DeleteCardFactory.make();
  const updateCard = UpdateCardFactory.make();
  const submitReview = SubmitReviewFactory.make();

  const createCardController = new CreateCardController(createCard);
  const deleteCardController = new DeleteCardController(deleteCard);
  const updateCardController = new UpdateCardController(updateCard);
  const submitReviewController = new SubmitReviewController(submitReview);

  router.post("/cards", RouteAdapter.adapt(createCardController));
  router.delete("/cards/:id", RouteAdapter.adapt(deleteCardController));
  router.put("/cards/:id", RouteAdapter.adapt(updateCardController));
  router.get(
    "/cards/submitReview/:id",
    RouteAdapter.adapt(submitReviewController)
  );
}
