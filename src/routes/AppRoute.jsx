import { Fragment } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import PrivateRoute from "./PrivateRoute";
import routesConfig from "./RouteConfig";
import { useSelector } from "react-redux";

const AppRoute = () => {
  const { isAuth: isAuthenticated } = useSelector((state) => state.auth);

  // Hàm đệ quy để render các route và route con
  const renderRoutes = (routes) =>
    routes.map(
      ({
        path,
        layout: Layout,
        component,
        name,
        private: isPrivate,
        isShowBottomNav,
      }) => {
        // Nếu có layout thì sẽ render layout, nếu là null thì không render layout, nếu không có layout thì sẽ mặt định là DefaultLayout
        const EffectiveLayout =
          Layout === null ? Fragment : Layout || DefaultLayout;
        const Element = component;

        return (
          <Route
            key={name}
            path={path}
            element={
              isPrivate ? (
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <EffectiveLayout isShowBottomNav={isShowBottomNav}>
                    <Element />
                  </EffectiveLayout>
                </PrivateRoute>
              ) : (
                <EffectiveLayout>
                  <Element />
                </EffectiveLayout>
              )
            }
          ></Route>
        );
      }
    );

  return (
    <Router>
      <Routes>{renderRoutes(routesConfig)}</Routes>
    </Router>
  );
};
export default AppRoute;
