import { client } from './client';
import { 
  ApprovalCreate, 
  ApprovalResponse 
} from '../types';

export const approvalsApi = {
  getAll: () => client<ApprovalResponse[]>('/approvals'),
  create: (data: ApprovalCreate) => client<ApprovalResponse>('/approvals', { data }),
  approve: (id: string) => client<ApprovalResponse>(`/approvals/${id}/approve`, { method: 'PUT' }),
  reject: (id: string) => client<ApprovalResponse>(`/approvals/${id}/reject`, { method: 'PUT' }),
  delete: (id: string) => client<{ message: string }>(`/approvals/${id}`, { method: 'DELETE' }),
};
