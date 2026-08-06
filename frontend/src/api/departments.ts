import { client } from './client';

export interface DepartmentCreate {
  name: string;
}

export interface DepartmentResponse {
  id: string;
  name: string;
  code: string;
  hod_id: string;
}

export const departmentsApi = {
  create: (data: DepartmentCreate) => client<DepartmentResponse>('/departments/', { data }),
  getMine: () => client<DepartmentResponse | null>('/departments/me'),
  regenerateCode: () => client<DepartmentResponse>('/departments/code', { method: 'PUT' }),
};
