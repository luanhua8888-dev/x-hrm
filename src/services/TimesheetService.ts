import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import { GetTimesheetParams, Timesheet } from '@/types/timesheet/timesheet';

class TimesheetService {
  static GetAllTimesheet = (params?: GetTimesheetParams) =>
    api.get<PagingResponse<Timesheet>>(API_ENDPOINTS.TIMESHEET.ROOT, params);

  static GetTimesheetById = (id: string) =>
    api.get<Timesheet>(API_ENDPOINTS.TIMESHEET.DETAIL(id));

  static SubmitTimesheet = (id: string) =>
    api.post<Timesheet>(API_ENDPOINTS.TIMESHEET.SUBMIT(id));

  static ApproveTimesheet = (id: string) =>
    api.post<Timesheet>(API_ENDPOINTS.TIMESHEET.APPROVE(id));

  static RejectTimesheet = (id: string) =>
    api.post<Timesheet>(API_ENDPOINTS.TIMESHEET.REJECT(id));
}

export default TimesheetService;
