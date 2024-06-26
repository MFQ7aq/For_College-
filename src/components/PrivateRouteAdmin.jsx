import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteAdmin = () => {
  const token = localStorage.getItem('token');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:8092/api/get/role", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.log(error);
        setUserRole(false);
      }
    };

    if (token) {
      getUserRole();
    } else {
      setUserRole(null);
    }
  }, [token]);

  if (userRole === 'admin') {
    return <Outlet />;
  } else if (userRole === null) {
    return <div className="Edu__text-L center">Loading...</div>;
  } else {
    return <Navigate to="/Authorization" />;
  }
};

export default PrivateRouteAdmin;