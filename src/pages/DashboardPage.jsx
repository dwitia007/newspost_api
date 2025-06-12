import React from "react";
import { useSelector } from "react-redux";
import Filters from "../components/Dashboard/Filters";
import NewsList from "../components/Dashboard/NewsList";
import PayoutCalculator from "../components/Dashboard/PayoutCalculator";
import ExportButtons from "../components/Dashboard/ExportButtons";
import AnalyticsChart from "../components/Dashboard/AnalyticsChart";

const DashboardPage = () => {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "admin";

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>News Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.email}</span>
          <span className="user-role">({user?.role})</span>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <Filters />
        </aside>

        <main className="dashboard-main">
          {isAdmin && (
            <>
              <PayoutCalculator />
              <ExportButtons />
              <AnalyticsChart />
            </>
          )}
          <NewsList />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
