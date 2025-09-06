import React, { useEffect } from 'react';
import { useAuth } from '../context/UserContext';
import { Outlet, useNavigate } from 'react-router';

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    } else {
        if (window.location.pathname === "/") {
          // 👇 role based default redirect
          if (user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/user/dashboard");
          }
        }
      }
  }, [user, loading, navigate]);

  if (loading) return <p>Loading...</p>;

  // agar user nahi hai aur loading bhi nahi hai
  if (!user) return null;

  return <Outlet />;
};

export default PrivateRoute;
