import React from "react";
import Login from "../components/Auth/Login";

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-page-content">
        <h1>Dashboard</h1>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
