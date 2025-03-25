import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await axios.post(`${API_URL}/resume/upload`, formData);
  return response.data;
};

export const findJobsBySkill = async (skills:string[]) => {
  try {
    const response = await axios.post('http://localhost:5000/api/jobs/jobsbyskill', { skills });
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs by skill:', error);
    throw error;
  }
};
