import axios from 'axios';
import type { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'https://server-kg.onrender.com/api';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 seconds
});

// Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  statusCode?: number;
  details?: any;
}

export interface FeedbackData {
  name: string;
  email?: string;
  rating: number;
  message: string;
}

export interface AuthData {
  name: string;
  email: string;
  phone?: string;
  course: string;
  message?: string; // For additional registration information
}

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Request interceptor for adding auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Generic API request handler
async function apiRequest<T = any>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data: any = null,
  config: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient({
      url: endpoint,
      method,
      data: method !== 'GET' ? data : undefined,
      params: method === 'GET' ? data : undefined,
      ...config,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;

    // Handle network errors
    if (!axiosError.response) {
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
        error: 'NETWORK_ERROR',
      };
    }

    // Handle HTTP errors
    const { status, data } = axiosError.response;
    let errorMessage = 'An error occurred';
    let errorCode = 'UNKNOWN_ERROR';

    switch (status) {
      case 400:
        errorMessage = data?.message || 'Bad request';
        errorCode = 'BAD_REQUEST';
        break;
      case 401:
        errorMessage = 'Unauthorized. Please log in again.';
        errorCode = 'UNAUTHORIZED';
        // Optionally clear auth state here
        break;
      case 403:
        errorMessage = 'You do not have permission to perform this action';
        errorCode = 'FORBIDDEN';
        break;
      case 404:
        errorMessage = 'The requested resource was not found';
        errorCode = 'NOT_FOUND';
        break;
      case 500:
        errorMessage = 'Internal server error. Please try again later.';
        errorCode = 'SERVER_ERROR';
        break;
      default:
        errorMessage = data?.message || 'An unexpected error occurred';
        errorCode = data?.error || 'UNKNOWN_ERROR';
    }

    console.error(`API Error (${endpoint}):`, {
      status,
      message: errorMessage,
      error: errorCode,
      details: data?.details,
    });

    return {
      success: false,
      message: errorMessage,
      error: errorCode,
      statusCode: status,
    };
  }
}

// Response interceptor for handling responses and errors
apiClient.interceptors.response.use(
  (response) => {
    // You can modify successful responses here if needed
    return response;
  },
  (error: AxiosError) => {
    // Handle CORS errors specifically
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error - Check if the server is running and CORS is properly configured');
      return Promise.reject({
        response: {
          status: 0,
          data: {
            success: false,
            message: 'Cannot connect to the server. Please check your network connection.',
            error: 'NETWORK_ERROR'
          }
        }
      });
    }

    // For other errors, just pass them through
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: AuthData) =>
    apiRequest('/auth/register', 'POST', data),
};

// Contact API
export const contactAPI = {
  send: (data: ContactData) =>
    apiRequest<{ message: string }>('/contact', 'POST', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  getInquiries: () =>
    apiRequest<Array<ContactData>>('/contact', 'GET'),

  getInquiry: (id: string) =>
    apiRequest<ContactData>(`/contact/${id}`, 'GET')
};

// Feedback API
export const feedbackAPI = {
  submit: (data: FeedbackData) =>
    apiRequest<{ message: string }>('/feedback', 'POST', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  getAllFeedback: () =>
    apiRequest<Array<FeedbackData>>('/feedback', 'GET'),

  getFeedbackByRating: (rating: number) =>
    apiRequest<Array<FeedbackData>>('/feedback', 'GET', { rating }),

  deleteFeedback: (id: string) =>
    apiRequest<{ message: string }>(`/feedback/${id}`, 'DELETE')
};

// Health check
export const healthCheck = () =>
  apiClient.get('/health')
    .then(response => response.data)
    .catch(error => ({
      success: false,
      message: 'Health check failed',
      error: error.message,
      status: error.response?.status || 0
    }));

// Utility function to set auth token
const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Initialize auth token if exists
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

const api = {
  auth: {
    ...authAPI,
    setToken: setAuthToken,
  },
  contact: contactAPI,
  feedback: feedbackAPI,
  healthCheck,
  client: apiClient,
  setBaseURL: (url: string) => {
    apiClient.defaults.baseURL = url;
  },
  setAuthHeader: (token: string) => {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  removeAuthHeader: () => {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

export default api;
