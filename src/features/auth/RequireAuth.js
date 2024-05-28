import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectCurrentToken } from "./authSlice";

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);

  // TODO: Redirect to login page if token is null
  return token ? <Outlet /> : <Outlet />;
};

export default RequireAuth;
