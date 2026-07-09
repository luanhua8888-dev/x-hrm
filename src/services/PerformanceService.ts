import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import { GetPerformanceReviewParams, PerformanceReview } from '@/types/performance/performance';

class PerformanceService {
  static GetAllPerformanceReview = (params?: GetPerformanceReviewParams) =>
    api.get<PagingResponse<PerformanceReview>>(API_ENDPOINTS.PERFORMANCE.REVIEWS, params);
}

export default PerformanceService;
