import { client } from './client';
import { 
  EventCreate, 
  EventUpdate, 
  EventResponse 
} from '../types';

export const eventsApi = {
  getAll: () => client<EventResponse[]>('/events'),
  getById: (id: string) => client<EventResponse>(`/events/${id}`),
  create: (data: EventCreate) => client<EventResponse>('/events', { data }),
  update: (id: string, data: EventUpdate) => client<EventResponse>(`/events/${id}`, { method: 'PUT', data }),
  delete: (id: string) => client<{ message: string }>(`/events/${id}`, { method: 'DELETE' }),
};
