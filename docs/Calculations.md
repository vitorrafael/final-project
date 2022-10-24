# Calculations

## Afferent Couplings
- Entities = 6
  - Card = 2
  - CardGroup = 2
  - SuperMemoAlgorithm = 2
- Use Cases = 9
  - CreateCard  = 1
  - CreateCardGroup = 1
  - DeleteCard = 1
  - DeleteCardGroup = 1
  - DisplayCardGroups = 1
  - StartCardGroupReview = 1
  - SubmitReview = 1
  - UpdateCardGroup = 1
  - UpdateCard = 1
- Controllers = 9
  - CreateCardController  = 1
  - CreateCardGroupController = 1
  - DeleteCardController = 1
  - DeleteCardGroupController = 1
  - DisplayCardGroupsController = 1
  - StartCardGroupReviewController = 1
  - SubmitReviewController = 1
  - UpdateCardGroupController = 1
  - UpdateCardController = 1
- Adapters = 14
  - SQLiteCardGroupRepository = 7
  - SQLiteCardRepository = 7
  - SQLiteHelper = 0
- Main - 0
  - Factories = 0
  - Routes = 0

## Efferent Couplings
- Entities = 0
  - Card = 0
  - CardGroup = 0
  - SuperMemoAlgorithm = 0
- Use Cases = 5
  - CreateCard  = 1
  - CreateCardGroup = 1
  - DeleteCard = 0
  - DeleteCardGroup = 0
  - DisplayCardGroups = 0
  - StartCardGroupReview = 0
  - SubmitReview = 1
  - UpdateCardGroup = 1
  - UpdateCard = 1
- Controllers = 9
  - CreateCardController  = 1
  - CreateCardGroupController = 1
  - DeleteCardController = 1
  - DeleteCardGroupController = 1
  - DisplayCardGroupsController = 1
  - StartCardGroupReviewController = 1
  - SubmitReviewController = 1
  - UpdateCardGroupController = 1
  - UpdateCardController = 1
- Adapters = 3
  - SQLiteCardGroupRepository = 1
  - SQLiteCardRepository = 1
  - SQLiteHelper = 1
- Main = 11
  - Factories = 9
  - Routes = 2

## Instability

- Entities = 0 / (6 + 0) = 0 / 6 = 0
- Use Cases = 5 / (5 + 9) = 5 / 14 = 0,35
- Controllers = 9 / (9 + 9) = 0.5
- Adapters = 3 / (3 + 14) = 0.17
- Controllers & Adapters = 12 / (12 + 23) = 0.34
- Main = 11 / (0 + 11) = 1

## Abstractness
  - Entities
    - Number of Classes: 3
    - Number of Abstract Classes and Interfaces: 1
    - A = 1 / (3 + 1) = 1 / 4 = 0.25 
  - UseCases
    - Number of Classes: 11
    - Number of Abstract Classes and Interfaces: 14
    - A = 14 / (11 + 14) = 14 / 25 = 0,56
  - Controllers
    - Number of Classes: 11
    - Number of Abstract Classes and Interfaces: 3
    - A = 3 / (11 + 3) = 3 / 14 = 0,21
  - Adapters
    - Number of Classes: 4
    - Number of Abstract Classes and Interfaces: 2
    - A = 2 / (4 + 2) = 2 / 6 = 0,66
  - Main
    - Number of Classes: 13
    - Number of Abstract Classes and Interfaces: 0
    - A = 0 / (0 + 13) = 0 / 13 = 0