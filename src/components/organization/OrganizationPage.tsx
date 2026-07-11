import { Navigate, useLocation } from 'react-router-dom';

import CompanyPage from '@/components/organization/company/CompanyPage';
import DepartmentsPage from '@/components/organization/departments/DepartmentsPage';
import JobTitlesPage from '@/components/organization/jobtitles/JobTitlesPage';
import LocationsPage from '@/components/organization/locations/LocationsPage';

export default function OrganizationPage() {
  const pathname = useLocation().pathname;

  if (pathname === '/organization') return <Navigate to="/organization/company" replace />;
  if (pathname.endsWith('/company')) return <CompanyPage />;
  if (pathname.endsWith('/departments')) return <DepartmentsPage />;
  if (pathname.endsWith('/locations')) return <LocationsPage />;
  if (pathname.endsWith('/job-titles')) return <JobTitlesPage />;

  return <Navigate to="/organization/company" replace />;
}
