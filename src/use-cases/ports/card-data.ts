export interface CardData {
  id?: string;
  front: string;
  back: string;
  nextReviewDue?: Date;
  reviewCount?: number;
  eFactor?: number;
}
