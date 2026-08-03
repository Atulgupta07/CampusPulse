import { client } from './client';
import { 
  AIChatRequest, 
  AIChatResponse,
  AIDashboardSummaryResponse,
  AIReportResponse
} from '../types';

export const aiApi = {
  chat: (data: AIChatRequest) => client<AIChatResponse>('/ai/chat', { data }),
  getDashboardSummary: () => client<AIDashboardSummaryResponse>('/ai/dashboard-summary'),
  generateReport: () => client<AIReportResponse>('/ai/generate-report', { data: {} }),
  getCalendarInsights: () => client<any>('/ai/calendar-insights'),
  getApprovalSuggestions: () => client<any>('/ai/approval-suggestions'),
  getNotificationSummary: () => client<any>('/ai/notification-summary', { data: {} }),
};
