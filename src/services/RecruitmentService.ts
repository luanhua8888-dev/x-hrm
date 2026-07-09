import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import { GetVacancyParams, Vacancy } from '@/types/recruitment/recruitment';

class RecruitmentService {
  static GetAllVacancy = (params?: GetVacancyParams) =>
    api.get<PagingResponse<Vacancy>>(API_ENDPOINTS.RECRUITMENT.VACANCIES, params);

  static GetVacancyById = (id: string) =>
    api.get<Vacancy>(API_ENDPOINTS.RECRUITMENT.VACANCY_DETAIL(id));
}

export default RecruitmentService;
