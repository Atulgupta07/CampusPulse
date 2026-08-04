import { client } from './client';
import { 
  LoginRequest, 
  LoginResponse, 
  UserResponse,
  ForgotPasswordRequest,
  RegisterRequest
} from '../types';

export const authApi = {
  login: (data: LoginRequest) => 
    client<LoginResponse>('/auth/login', { data }),
    
  getCurrentUser: () => 
    client<UserResponse>('/auth/me'),
    
  register: (data: RegisterRequest) =>
    client<UserResponse>('/auth/register', { data }),
    
  forgotPassword: (data: ForgotPasswordRequest) => 
    client<{ message: string }>('/auth/forgot-password', { data }),
};
