import { useQuery } from '@tanstack/react-query';

import OrganizationService from '@/services/OrganizationService';

export const organizationKeys = {
  all: ['organization'] as const,
  summary: () => [...organizationKeys.all, 'summary'] as const,
};

export function useOrganization() {
  return useQuery({
    queryKey: organizationKeys.summary(),
    queryFn: () => OrganizationService.GetOrganization(),
  });
}
