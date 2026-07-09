import { PagingParams } from '@/types/api/paging';

export type VacancyStatus = 'ACTIVE' | 'INACTIVE' | 'CLOSED';

export interface Vacancy {
  id: string;
  name: string;
  jobTitleId: string;
  hiringManagerId: string;
  numberOfPositions: number;
  status: VacancyStatus;
}

export interface GetVacancyParams extends PagingParams {
  status?: VacancyStatus;
}
