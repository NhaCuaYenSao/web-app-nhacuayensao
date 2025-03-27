import { Navigate } from "react-router-dom";
import { ROUTES } from "~/constants/route-constant";

export default function PrivateRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} />;
}
