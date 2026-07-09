import { useQuery } from '@tanstack/react-query';

import RecruitmentService from '@/services/RecruitmentService';
import { GetVacancyParams } from '@/types/recruitment/recruitment';

export const recruitmentKeys = {
  all: ['recruitment'] as const,
  vacancies: () => [...recruitmentKeys.all, 'vacancies'] as const,
  vacancyList: (params?: GetVacancyParams) => [...recruitmentKeys.vacancies(), params] as const,
};

export function useVacancies(params?: GetVacancyParams) {
  return useQuery({
    queryKey: recruitmentKeys.vacancyList(params),
    queryFn: () => RecruitmentService.GetAllVacancy(params),
  });
}
