const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Generic fetch wrapper
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Projects API
export const projectsApi = {
  getAll: () => apiFetch('/projects'),
  
  create: (data: any, files?: File[]) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
    if (files) {
      files.forEach((file) => formData.append('images', file));
    }
    
    return apiFetch('/projects', {
      method: 'POST',
      body: formData,
    });
  },
  
  update: (id: number, data: any, files?: File[]) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
    if (files && files.length > 0) {
      files.forEach((file) => formData.append('images', file));
    }
    
    return apiFetch(`/projects/${id}`, {
      method: 'PUT',
      body: formData,
    });
  },
  
  delete: (id: number) => {
    return apiFetch(`/projects/${id}`, {
      method: 'DELETE',
    });
  },
};

// Social Impact API
export const socialImpactApi = {
  getAll: () => apiFetch('/social-impact'),
  
  create: (data: any, files?: File[]) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
    if (files) {
      files.forEach((file) => formData.append('images', file));
    }
    
    return apiFetch('/social-impact', {
      method: 'POST',
      body: formData,
    });
  },
  
  update: (id: string, data: any, files?: File[]) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
    if (files && files.length > 0) {
      files.forEach((file) => formData.append('images', file));
    }
    
    return apiFetch(`/social-impact/${id}`, {
      method: 'PUT',
      body: formData,
    });
  },
  
  delete: (id: string) => {
    return apiFetch(`/social-impact/${id}`, {
      method: 'DELETE',
    });
  },
};

// Health check
export const healthCheck = () => apiFetch('/health');
