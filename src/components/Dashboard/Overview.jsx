import React from 'react';
import { useSelector } from 'react-redux';

const Overview = () => {
  const newsData = useSelector(state => state.news.data);
  const stats = {
    totalArticles: newsData?.length || 0,
    // Add more stats as needed
  };

  return (
    <div className="overview-container">
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Articles</h3>
          <p>{stats.totalArticles}</p>
        </div>
        {/* Add more stat cards as needed */}
      </div>
    </div>
  );
};

export default Overview; 