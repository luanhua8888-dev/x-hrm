import { useQuery } from '@tanstack/react-query';

import PerformanceService from '@/services/PerformanceService';
import { GetPerformanceReviewParams } from '@/types/performance/performance';

export const performanceKeys = {
  all: ['performance'] as const,
  reviews: () => [...performanceKeys.all, 'reviews'] as const,
  reviewList: (params?: GetPerformanceReviewParams) =>
    [...performanceKeys.reviews(), params] as const,
};

export function usePerformanceReviews(params?: GetPerformanceReviewParams) {
  return useQuery({
    queryKey: performanceKeys.reviewList(params),
    queryFn: () => PerformanceService.GetAllPerformanceReview(params),
  });
}
