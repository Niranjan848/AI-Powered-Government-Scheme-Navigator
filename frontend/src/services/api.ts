const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api';

export interface HealthResponse {
  status: string;
}

export interface ProfileResponse {
  profile_completion: number;
  readiness_score: number;
  data: Record<string, unknown>;
}

export interface RecommendationItem {
  id?: string;
  name?: string;
  ministry?: string;
  status?: string;
  score?: number;
}

export interface HistoryItem {
  title?: string;
  detail?: string;
}

export interface NotificationItem {
  title?: string;
  detail?: string;
}

export interface RecommendationsResponse {
  items: RecommendationItem[];
}

export interface HistoryResponse {
  items: HistoryItem[];
}

export interface NotificationsResponse {
  items: NotificationItem[];
}

export interface ChatResponse {
  response: string;
  conversation_id: string;
  recommended_schemes: unknown[];
  checklist: unknown[];
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  health: () => fetch(baseUrl.replace(/\/api$/, '') + '/health').then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json() as Promise<HealthResponse>;
  }),
  signup: (payload: { email: string; password: string; role: string }) => request('/signup', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload: { email: string; password: string }) => request('/login', { method: 'POST', body: JSON.stringify(payload) }),
  chat: (payload: { message: string; conversation_id?: string }) => request<ChatResponse>('/chat', { method: 'POST', body: JSON.stringify(payload) }),
  uploadPdf: (formData: FormData) => fetch(`${baseUrl}/upload-pdf`, { method: 'POST', body: formData }),
  recommendations: () => request<RecommendationsResponse>('/recommendations'),
  history: () => request<HistoryResponse>('/history'),
  profile: () => request<ProfileResponse>('/profile'),
  bookmark: (schemeId: string) => request('/bookmark', { method: 'POST', body: JSON.stringify({ scheme_id: schemeId }) }),
  notifications: () => request<NotificationsResponse>('/notifications'),
};
