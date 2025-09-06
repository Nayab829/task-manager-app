import React, { useEffect } from 'react';
import { useAuth } from '../context/UserContext';
import { Outlet, useNavigate } from 'react-router';
import Loading from '../components/Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
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

  if (loading) return <Loading />;

  if (!user) return null;

  // 👇 children render karo agar diye gaye ho
  return children ? children : <Outlet />;
};

export default PrivateRoute;
