import { Router } from "express";
import { CreateCardGroupController } from "../../controllers/create-card-group-controller";
import { DeleteCardGroupController } from "../../controllers/delete-card-group-controller";
import { DisplayCardGroupsController } from "../../controllers/display-card-groups-controller";
import { StartCardGroupReviewController } from "../../controllers/start-card-group-review-controller";
import { UpdateCardGroupController } from "../../controllers/update-card-group-controller";
import { RouteAdapter } from "../adapters/route-adapter";
import { CreateCardGroupFactory } from "../factories/use-cases/create-card-group-factory";
import { DeleteCardGroupFactory } from "../factories/use-cases/delete-card-group-factory";
import { DisplayCardGroupsFactory } from "../factories/use-cases/display-card-group-factory";
import { StartCardGroupReviewFactory } from "../factories/use-cases/start-card-group-review-factory";
import { UpdateCardGroupFactory } from "../factories/use-cases/update-card-group-factory";

export class CardGroupRouter {
  public constructor(private router: Router) {}

  public start(): void {
    const createCardGroupUseCase = CreateCardGroupFactory.make();
    const deleteCardGroupUseCase = DeleteCardGroupFactory.make();
    const updateCardGroupUseCase = UpdateCardGroupFactory.make();
    const startCardGroupReviewUseCase = StartCardGroupReviewFactory.make();
    const displayCardGroupsUseCase = DisplayCardGroupsFactory.make();

    const createCardGroupController = new CreateCardGroupController(
      createCardGroupUseCase
    );
    const deleteCardGroupController = new DeleteCardGroupController(
      deleteCardGroupUseCase
    );
    const updateCardGroupController = new UpdateCardGroupController(
      updateCardGroupUseCase
    );
    const startCardGroupReviewController = new StartCardGroupReviewController(
      startCardGroupReviewUseCase
    );
    const displayCardGroupsController = new DisplayCardGroupsController(
      displayCardGroupsUseCase
    );

    this.router.post(
      "/cardGroups",
      RouteAdapter.adapt(createCardGroupController)
    );
    this.router.delete(
      "/cardGroups/:id",
      RouteAdapter.adapt(deleteCardGroupController)
    );
    this.router.put(
      "/cardGroups/:id",
      RouteAdapter.adapt(updateCardGroupController)
    );
    this.router.get(
      "/cardGroups/startReview/:id",
      RouteAdapter.adapt(startCardGroupReviewController)
    );
    this.router.get(
      "/cardGroups",
      RouteAdapter.adapt(displayCardGroupsController)
    );
  }
}
