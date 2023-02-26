
export interface CreateCardRequest {
  front: string;
  back: string;
  groupId?: number;
}
export interface CreateCardGroupRequest {
  topic: string;
  description: string;
}

export interface DeleteCardRequest {
  id: number;
}

export interface DeleteCardGroupRequest {
  id: number;
}

export interface StartCardGroupReviewRequest {
  topic: string;
}

export interface SubmitReviewRequest {
  id: number;
  front: string;
  responseQuality: number;
}

export interface UpdateCardRequest {
  id: number;
  front?: string;
  back?: string;
}

export interface UpdateCardGroupRequest {
  id: number;
  description?: string;
  topic?: string;
}