import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const uploadFile = async (formData, onProgress) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      const progress = progressEvent.loaded / progressEvent.total;
      onProgress?.(progress);
    }
  });
  return response.data.task_id;
};

export const checkTaskStatus = async (taskId) => {
  const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`);
  return response.data;
};
