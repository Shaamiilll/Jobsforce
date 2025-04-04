import axios from 'axios';

const API_URL = import.meta.env.VITE_HOST_URL || 'http://localhost:5000/api';
const token = localStorage.getItem('token')

// for uploading the resume
export const uploadResume = async (file: File) => {
  console.log('====================================');
  console.log(API_URL);
  console.log('====================================');
  const formData = new FormData();
  formData.append('resume', file);
  try {
    const response = await axios.post(`${API_URL}/resume/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs by skill:', error);
    throw error;
  }
};


// for fetching the recommended jobs
export const findJobsBySkill = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/jobs/recommended`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    
    console.error('Error fetching jobs by skill:', error);
    throw error;
  }
};
