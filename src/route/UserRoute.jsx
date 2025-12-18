
import { Navigate, Outlet } from "react-router-dom";

function UserLayout() {
  const userData = JSON.parse(localStorage.getItem("currentUser"));

  if (userData?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

export default UserLayout;
