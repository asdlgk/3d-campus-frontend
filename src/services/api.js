import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// OSS相关接口
export const getOSSPolicy = async () => {
  const response = await axios.get(`${API_BASE_URL}/oss/policy`);
  return response.data;
};

export const uploadToOSS = async (file, policy) => {
  const formData = new FormData();
  Object.entries(policy.formData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append('file', file);

  await axios.post(policy.host, formData);
  return policy.filePath;
};

// 任务接口
export const createTask = async (filePath) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, { file_path: filePath });
  return response.data.task_id;
};

export const checkTaskStatus = async (taskId) => {
  const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`);
  return response.data;
};
