import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await axios.post(`${API_URL}/resume/upload`, formData);
  return response.data;
};
