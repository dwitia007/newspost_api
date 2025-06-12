import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNews } from '../../redux/reducers/newsReducer';

const Filters = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    dateFrom: '',
    dateTo: '',
    author: ''
  });

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Load initial data only once
  useEffect(() => {
    const params = {
      q: 'news', // Simple search term
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 20
    };
    dispatch(fetchNews(params));
  }, [dispatch]);

  // Handle filter changes with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = {
        q: filters.search || 'news', // Default to 'news' if no search term
        category: filters.category,
        from: filters.dateFrom,
        to: filters.dateTo,
        author: filters.author,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 20
      };

      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (!params[key]) {
          delete params[key];
        }
      });

      dispatch(fetchNews(params));
    }, 1000);

    return () => clearTimeout(timer);
  }, [filters, dispatch]);

  return (
    <div className="filters-container">
      <h3>Filters</h3>
      <div className="filter-group">
        <label>
          Search:
          <input
            type="text"
            name="search"
            placeholder="Search articles..."
            value={filters.search}
            onChange={handleFilterChange}
          />
        </label>
      </div>

      <div className="filter-group">
        <label>
          Category:
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All Categories</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
          </select>
        </label>
      </div>

      <div className="filter-group">
        <label>
          Author:
          <input
            type="text"
            name="author"
            placeholder="Filter by author..."
            value={filters.author}
            onChange={handleFilterChange}
          />
        </label>
      </div>

      <div className="filter-group">
        <label>
          Date Range:
          <div className="date-inputs">
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              placeholder="From"
            />
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
              placeholder="To"
            />
          </div>
        </label>
      </div>

      <button 
        className="reset-filters"
        onClick={() => setFilters({
          search: '',
          category: '',
          dateFrom: '',
          dateTo: '',
          author: ''
        })}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters; 