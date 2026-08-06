import { client } from './client';
import { 
  EmployeeCreate, 
  EmployeeUpdate, 
  EmployeeResponse 
} from '../types';

export const employeesApi = {
  getAll: (skip = 0, limit = 100) => 
    client<EmployeeResponse[]>(`/auth/employees?skip=${skip}&limit=${limit}`),
    
  getById: (id: string) => 
    client<EmployeeResponse>(`/auth/employees/${id}`),
    
  create: (data: EmployeeCreate) => 
    client<EmployeeResponse>('/auth/employees', { data }),
    
  update: (id: string, data: EmployeeUpdate) => 
    client<EmployeeResponse>(`/auth/employees/${id}`, { method: 'PUT', data }),
    
  delete: (id: string) => 
    client<{ message: string }>(`/auth/employees/${id}`, { method: 'DELETE' }),
};
