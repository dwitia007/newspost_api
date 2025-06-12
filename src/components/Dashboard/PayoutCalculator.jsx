import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPayouts } from '../../redux/reducers/newsReducer';

const PayoutCalculator = () => {
  const dispatch = useDispatch();
  const newsData = useSelector(state => state.news.data);
  const [payoutRate, setPayoutRate] = useState(() => {
    return localStorage.getItem('payoutRate') || '10';
  });

  useEffect(() => {
    // Save payout rate to localStorage
    localStorage.setItem('payoutRate', payoutRate);
    
    // Calculate payouts for all articles
    const payouts = newsData.map(article => ({
      id: article.url,
      title: article.title,
      author: article.author || 'Unknown',
      date: article.publishedAt,
      payout: parseFloat(payoutRate)
    }));

    dispatch(setPayouts(payouts));
  }, [payoutRate, newsData, dispatch]);

  const totalPayout = newsData.length * parseFloat(payoutRate);

  return (
    <div className="payout-calculator">
      <h2>Payout Calculator</h2>
      <div className="payout-controls">
        <div>
          <label>Payout Rate per Article ($):</label>
          <input
            type="number"
            value={payoutRate}
            onChange={(e) => setPayoutRate(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>
        <div className="total-payout">
          Total Payout: ${totalPayout.toFixed(2)}
        </div>
      </div>
      <div className="payout-summary">
        <p>Number of Articles: {newsData.length}</p>
        <p>Rate per Article: ${parseFloat(payoutRate).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default PayoutCalculator; 