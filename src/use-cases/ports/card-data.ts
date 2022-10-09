export interface CardData {
  id?: number;
  front: string;
  back: string;
  nextReviewDue?: Date;
  reviewCount?: number;
  eFactor?: number;
  groupId?: number;
}
