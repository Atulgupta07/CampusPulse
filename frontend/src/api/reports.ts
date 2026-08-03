import { client } from './client';
import { 
  DashboardStatsResponse,
  ActivityLogResponse,
  DepartmentReportSummary
} from '../types';

export const reportsApi = {
  getDashboardStats: () => client<DashboardStatsResponse>('/reports/dashboard-stats'),
  getRecentActivities: () => client<ActivityLogResponse[]>('/reports/recent-activities'),
  getSummary: () => client<DepartmentReportSummary>('/reports/summary'),
  exportReport: () => client<any>('/reports/export'),
};
