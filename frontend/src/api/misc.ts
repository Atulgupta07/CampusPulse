import { client, getAuthToken } from './client';
import { 
  UserSettingsResponse,
  UserSettingsUpdate,
  DepartmentProfileResponse
} from '../types';

export const settingsApi = {
  getUserSettings: () => client<UserSettingsResponse>('/settings/me'),
  updateUserSettings: (data: UserSettingsUpdate) => client<UserSettingsResponse>('/settings/me', { method: 'PUT', data }),
  getDepartmentProfile: () => client<DepartmentProfileResponse>('/settings/department'),
};

export const filesApi = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = getAuthToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1'}/files/upload`, {
      method: 'POST',
      body: formData,
      headers,
    });
    if (!response.ok) throw new Error('File upload failed');
    return response.json();
  },
};

export const searchApi = {
  globalSearch: (query: string) => client<any>(`/search?q=${encodeURIComponent(query)}`),
};
