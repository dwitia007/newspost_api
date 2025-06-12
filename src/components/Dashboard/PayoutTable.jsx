import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPayouts } from '../../redux/reducers/newsReducer';

const PayoutTable = () => {
  const dispatch = useDispatch();
  const payouts = useSelector(state => state.news.payouts) || [];
  const newsData = useSelector(state => state.news.data) || [];
  const user = useSelector(state => state.auth.user);
  const [payoutRate, setPayoutRate] = useState(10); // Default rate per article

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    // Calculate initial payouts when news data changes
    if (newsData.length > 0) {
      const calculatedPayouts = newsData.map(article => ({
        date: article.publishedAt,
        articleTitle: article.title,
        author: article.author || 'Unknown',
        amount: payoutRate,
        status: 'Pending'
      }));
      dispatch(setPayouts(calculatedPayouts));
    }
  }, [newsData, payoutRate, dispatch]);

  const handleRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setPayoutRate(newRate);
    // Update all payouts with new rate
    const updatedPayouts = payouts.map(payout => ({
      ...payout,
      amount: newRate
    }));
    dispatch(setPayouts(updatedPayouts));
  };

  const totalPayout = payouts.reduce((sum, payout) => sum + payout.amount, 0);

  if (!isAdmin) {
    return (
      <div className="payout-table">
        <h2>Payout Information</h2>
        <p>Only administrators can view and manage payouts.</p>
      </div>
    );
  }

  return (
    <div className="payout-table">
      <h2>Payout Information</h2>
      <div className="payout-controls">
        <label>
          Rate per Article ($):
          <input
            type="number"
            value={payoutRate}
            onChange={handleRateChange}
            min="0"
            step="0.01"
          />
        </label>
        <div className="total-payout">
          Total Payout: ${totalPayout.toFixed(2)}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Article</th>
            <th>Author</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map((payout, index) => (
            <tr key={index}>
              <td>{new Date(payout.date).toLocaleDateString()}</td>
              <td>{payout.articleTitle}</td>
              <td>{payout.author}</td>
              <td>${payout.amount.toFixed(2)}</td>
              <td>{payout.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayoutTable; 