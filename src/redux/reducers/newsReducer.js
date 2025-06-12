import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = '7e1f7d379ed04b91b20aad9b36846e1a';
const BASE_URL = 'https://newsapi.org/v2';

// Cache for storing API responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (params) => {
    try {
      // Create cache key from params
      const cacheKey = JSON.stringify(params);
      
      // Check cache
      const cachedData = cache.get(cacheKey);
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        return cachedData.data;
      }

      const queryParams = new URLSearchParams({
        apiKey: API_KEY,
        ...params
      });

      console.log('Making API request with params:', params);

      const response = await fetch(`${BASE_URL}/everything?${queryParams}`);
      const data = await response.json();

      console.log('API Response:', data);

      if (!response.ok) {
        if (data.status === 'error') {
          if (data.code === 'apiKeyInvalid') {
            throw new Error('Invalid API key. Please check your API key.');
          }
          throw new Error(data.message || 'Failed to fetch news');
        }
      }

      // Store in cache
      cache.set(cacheKey, {
        data: data.articles,
        timestamp: Date.now()
      });

      return data.articles;
    } catch (error) {
      console.error('News API Error:', error);
      throw error;
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
  payouts: [],
  analytics: {
    views: [],
    engagement: []
  }
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setNews: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setPayouts: (state, action) => {
      state.payouts = action.payload;
    },
    setAnalytics: (state, action) => {
      state.analytics = action.payload;
    },
    clearNews: (state) => {
      state.data = [];
      state.error = null;
    },
    clearCache: () => {
      cache.clear();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { 
  setLoading, 
  setError, 
  setNews, 
  setPayouts, 
  setAnalytics, 
  clearNews,
  clearCache 
} = newsSlice.actions;

export default newsSlice.reducer; 