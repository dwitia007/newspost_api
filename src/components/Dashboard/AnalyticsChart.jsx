import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const AnalyticsChart = () => {
  const newsData = useSelector(state => state.news.data);
  const payouts = useSelector(state => state.news.payouts);

  const analyticsData = useMemo(() => {
    // Articles by source
    const sourceData = newsData.reduce((acc, article) => {
      const source = article.source.name;
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});

    // Articles by date
    const dateData = newsData.reduce((acc, article) => {
      const date = new Date(article.publishedAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Payouts by source
    const payoutData = newsData.reduce((acc, article) => {
      const source = article.source.name;
      const payout = payouts.find(p => p.id === article.url)?.payout || 0;
      acc[source] = (acc[source] || 0) + payout;
      return acc;
    }, {});

    return {
      sourceData,
      dateData,
      payoutData
    };
  }, [newsData, payouts]);

  const sourceChartData = {
    labels: Object.keys(analyticsData.sourceData),
    datasets: [
      {
        label: 'Articles by Source',
        data: Object.values(analyticsData.sourceData),
        backgroundColor: 'rgba(54, 163, 235, 0.68)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const dateChartData = {
    labels: Object.keys(analyticsData.dateData),
    datasets: [
      {
        label: 'Articles by Date',
        data: Object.values(analyticsData.dateData),
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
        fill: false
      }
    ]
  };

  const payoutChartData = {
    labels: Object.keys(analyticsData.payoutData),
    datasets: [
      {
        label: 'Payouts by Source',
        data: Object.values(analyticsData.payoutData),
        backgroundColor: [
          'rgba(255, 99, 133, 0.55)',
          'rgba(54, 163, 235, 0.81)',
          'rgba(255, 207, 86, 0.47)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="analytics-charts">
      <h2>Analytics</h2>
      <div className="charts-grid">
        <div className="chart-container">
          <h3>Articles by Source</h3>
          <Bar data={sourceChartData} />
        </div>
        <div className="chart-container">
          <h3>Articles by Date</h3>
          <Line data={dateChartData} />
        </div>
        <div className="chart-container">
          <h3>Payouts by Source</h3>
          <Pie data={payoutChartData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart; 