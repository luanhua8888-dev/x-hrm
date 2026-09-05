export const profileTabs = [
  'personal',
  'contact',
  'job',
  'documents',
  'employment-history',
] as const;

export type ProfileTab = (typeof profileTabs)[number];

export type EmployeeWorkspace =
  | { kind: 'directory' }
  | { kind: 'onboarding' }
  | { kind: 'profile'; employeeId: string; tab: ProfileTab };

export function resolveEmployeeWorkspace(pathname: string): EmployeeWorkspace {
  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] !== 'employees' || segments.length === 1) return { kind: 'directory' };
  if (segments[1] === 'new') return { kind: 'onboarding' };

  const requestedTab = segments[2];
  const tab = profileTabs.includes(requestedTab as ProfileTab)
    ? (requestedTab as ProfileTab)
    : 'personal';

  return { kind: 'profile', employeeId: segments[1], tab };
}
