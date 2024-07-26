import { create } from 'zustand';

export interface Feedback {
    id: string;
    count: number;
    masterId: string;
    master: any | null;
    clientId: string;
    clientResDto: any | null;
    orderId: any | null;
    clientName: string;
    clientPhoto: string;
    text: string;
    date: string;
    feedbackStatusName: any | null;
  }
  
  export interface FeedbackPage {
    page: number;
    size: number;
    totalElements: number;
    totalPage: number;
    object: Feedback[];
  }
  
  export interface RatingData {
    overallRating: number;
    reviewCount: number;
    great: number;
    fine: number;
    average: number;
    badly: number;
    veryBadly: number;
    feedback: FeedbackPage;
  }
  
  export interface ApiResponse {
    body: RatingData;
    status: string;
    message: string;
    success: boolean;
  }
  
  export interface Reviews {
    overallRating: number;
    reviewCount: number;
    great: number;
    fine: number;
    average: number;
    badly: number;
    veryBadly: number;
    feedback: FeedbackPage;
  }
  

export interface Reviews {
  overallRating: number;
  reviewCount: number;
  great: number;
  fine: number;
  average: number;
  badly: number;
  veryBadly: number;
  feedback: FeedbackPage;
}

interface ReviewsState {
  reviews: Reviews | null;
  setReviews: (reviews: Reviews) => void;
}

export const useReviewsStore = create<ReviewsState>((set) => ({
  reviews: null,
  setReviews: (reviews: Reviews) => set({ reviews }),
}));
