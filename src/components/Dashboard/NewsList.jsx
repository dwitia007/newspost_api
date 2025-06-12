import React, { memo } from 'react';
import { useSelector } from 'react-redux';

const ArticleCard = memo(({ article }) => (
  <div className="article-card">
    <img 
      src={article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'} 
      alt={article.title} 
    />
    <h3>{article.title}</h3>
    <p>{article.description}</p>
    <div className="article-meta">
      <span>{article.source.name}</span>
      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
    </div>
    <a 
      href={article.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="read-more-link"
    >
      Read More
    </a>
  </div>
));

const NewsList = () => {
  const newsData = useSelector(state => state.news.data);
  const loading = useSelector(state => state.news.loading);
  const error = useSelector(state => state.news.error);

  if (loading) {
    return (
      <div className="news-list">
        <h2>Latest News</h2>
        <div className="loading-state">
          <p>Loading news articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-list">
        <h2>Latest News</h2>
        <div className="error-state">
          <p>Error: {error}</p>
          <div className="error-help">
            <p>To fix this error:</p>
            <ol>
              <li>Create a file named <code>.env.local</code> in your project root directory</li>
              <li>Add this line to the file: <code>REACT_APP_NEWS_API_KEY=your_api_key</code></li>
              <li>Get a free API key from <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">https://newsapi.org</a></li>
              <li>Restart your development server after adding the API key</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  if (!newsData || newsData.length === 0) {
    return (
      <div className="news-list">
        <h2>Latest News</h2>
        <div className="empty-state">
          <p>No news articles found. Try adjusting your filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-list">
      <h2>Latest News</h2>
      <div className="articles-grid">
        {newsData.map((article, index) => (
          <ArticleCard key={article.url || index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default memo(NewsList); 