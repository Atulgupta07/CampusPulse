import { client } from './client';
import { 
  LoginRequest, 
  LoginResponse, 
  UserResponse,
  ForgotPasswordRequest
} from '../types';

export const authApi = {
  login: (data: LoginRequest) => 
    client<LoginResponse>('/auth/login', { data }),
    
  getCurrentUser: () => 
    client<UserResponse>('/auth/me'),
    
  forgotPassword: (data: ForgotPasswordRequest) => 
    client<{ message: string }>('/auth/forgot-password', { data }),
};
