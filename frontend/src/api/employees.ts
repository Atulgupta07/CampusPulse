import { client } from './client';
import { 
  EmployeeCreate, 
  EmployeeUpdate, 
  EmployeeResponse 
} from '../types';

export const employeesApi = {
  getAll: (skip = 0, limit = 100) => 
    client<EmployeeResponse[]>(`/auth/users?skip=${skip}&limit=${limit}`),
    
  getById: (id: string) => 
    client<EmployeeResponse>(`/auth/users/${id}`),
    
  create: (data: EmployeeCreate) => 
    client<EmployeeResponse>('/auth/users', { data }),
    
  update: (id: string, data: EmployeeUpdate) => 
    client<EmployeeResponse>(`/auth/users/${id}`, { method: 'PUT', data }),
    
  delete: (id: string) => 
    client<{ message: string }>(`/auth/users/${id}`, { method: 'DELETE' }),
};
