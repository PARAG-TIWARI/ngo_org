import axios from 'axios';

const DEFAULT_BACKEND_BASE_URL = 'https://ngo-org.onrender.com';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `${DEFAULT_BACKEND_BASE_URL}/api`;
const BACKEND_BASE_URL = VITE_API_BASE_URL.replace(/\/api\/?$/, '') || DEFAULT_BACKEND_BASE_URL;

const normalizeImageUrl = (value) => {
  if (!value || typeof value !== 'string') return null;

  if (/^https?:\/\//i.test(value)) {
    try {
      const url = new URL(value);
      const currentBase = BACKEND_BASE_URL.replace(/\/$/, '');
      const isLegacyUploadHost = /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(url.hostname)
        || url.hostname === 'ngo-org.onrender.com'
        || url.hostname === 'ngo-org-w4wh.onrender.com'
        || url.hostname.endsWith('.onrender.com');

      if (isLegacyUploadHost && url.pathname.startsWith('/uploads/')) {
        return `${currentBase}${url.pathname}${url.search}`;
      }

      return value;
    } catch {
      return value;
    }
  }

  return value.startsWith('/uploads/') || value.startsWith('/api/uploads/')
    ? `${BACKEND_BASE_URL}${value}`
    : value.startsWith('uploads/')
      ? `${BACKEND_BASE_URL}/${value}`
      : value;
};

const api = axios.create({
  baseURL: VITE_API_BASE_URL,
});

export const FALLBACK_IMAGE = '/hero_children_studying.png';

export const handleBrokenImage = (event) => {
  const target = event?.currentTarget;
  if (!target) return;

  if (target.dataset.fallbackApplied === 'true') return;

  target.dataset.fallbackApplied = 'true';

  if (target.getAttribute('src') === FALLBACK_IMAGE) {
    return;
  }

  console.warn('Image failed to load:', target.getAttribute('src'));
};

export { BACKEND_BASE_URL, normalizeImageUrl };

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const get = (url, config) => api.get(url, config);
export const post = (url, data, config) => api.post(url, data, config);
export const put = (url, data, config) => api.put(url, data, config);
export const patch = (url, data, config) => api.patch(url, data, config);
export const del = (url, config) => api.delete(url, config);

export default api;
