import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';

export interface OrganizationSummary {
  id: string;
  name: string;
  registrationNumber?: string;
}

class OrganizationService {
  static GetOrganization = () =>
    api.get<OrganizationSummary>(API_ENDPOINTS.ORGANIZATION.ROOT);
}

export default OrganizationService;
