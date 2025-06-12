import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

const newsAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const getNews = async (params) => {
  try {
    const response = await newsAPI.get('/everything', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTopHeadlines = async (params) => {
  try {
    const response = await newsAPI.get('/top-headlines', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default newsAPI; 