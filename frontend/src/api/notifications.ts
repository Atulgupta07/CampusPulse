import { client } from './client';
import { 
  NotificationResponse,
  UnreadCountResponse
} from '../types';

export const notificationsApi = {
  getAll: () => client<NotificationResponse[]>('/notifications'),
  getUnreadCount: () => client<UnreadCountResponse>('/notifications/unread-count'),
  markAsRead: (id: string) => client<NotificationResponse>(`/notifications/${id}/read`, { method: 'PUT' }),
  markAllAsRead: () => client<{ message: string }>('/notifications/read-all', { method: 'PUT' }),
};
