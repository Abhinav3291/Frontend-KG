// Type definitions for our API service
// Rename the file to something like `api.d.ts`

declare module 'services/api' { // Use module name without relative path
  // Define the interface for feedback data
  export interface FeedbackData {
    name: string;
    email?: string;
    rating: number;
    message: string;
  }

  // Define the interface for authentication data
  export interface AuthData {
    name: string;
    email: string;
    phone?: string;
    course: string;
  }

  // Define the interface for contact data
  export interface ContactData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  // Define a generic API response interface
  export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
  }

  // Define API for Authentication
  export const authAPI: {
    register: (data: AuthData) => Promise<ApiResponse>;
  };

  // Define API for Contact
  export const contactAPI: {
    send: (data: ContactData) => Promise<ApiResponse>;
  };

  // Define API for Feedback
  export const feedbackAPI: {
    submit: (data: FeedbackData) => Promise<ApiResponse>;
  };

  // Define a health check API
  export const healthCheck: () => Promise<{ status: string; message: string }>;

  // Consolidate and export all the APIs together
  export const api: {
    auth: typeof authAPI;
    contact: typeof contactAPI;
    feedback: typeof feedbackAPI;
    healthCheck: typeof healthCheck;
  };
}
