import { useEffect, useMemo, useRef, useState } from 'react';

import {
  initialLeaveRequests,
  workforce,
  type DashboardPeriod,
  type Department,
  type LeaveRequest,
  type LeaveStatus,
} from './dashboard.mock';

export function useDashboardMock() {
  const [period, setPeriod] = useState<DashboardPeriod>('week');
  const [department, setDepartment] = useState<Department>('all');
  const [requests, setRequests] = useState<LeaveRequest[]>(() =>
    initialLeaveRequests.map((item) => ({ ...item })),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(() => new Date());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refresh = () => {
    if (timer.current) clearTimeout(timer.current);
    setIsLoading(true);
    timer.current = setTimeout(() => {
      setUpdatedAt(new Date());
      setIsLoading(false);
      timer.current = null;
    }, 600);
  };

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const selectPeriod = (value: DashboardPeriod) => {
    setPeriod(value);
    refresh();
  };

  const selectDepartment = (value: Department) => {
    setDepartment(value);
    refresh();
  };

  const filteredWorkforce = useMemo(
    () =>
      workforce.filter((employee) => department === 'all' || employee.department === department),
    [department],
  );

  const updateRequest = (id: string, status: Exclude<LeaveStatus, 'pending'>) => {
    setRequests((current) =>
      current.map((request) => (request.id === id ? { ...request, status } : request)),
    );
  };

  return {
    period,
    department,
    requests,
    isLoading,
    updatedAt,
    filteredWorkforce,
    pendingCount: requests.filter((request) => request.status === 'pending').length,
    selectPeriod,
    selectDepartment,
    refresh,
    updateRequest,
  };
}

export type DashboardMock = ReturnType<typeof useDashboardMock>;
