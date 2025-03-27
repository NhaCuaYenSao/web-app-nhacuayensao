import { ROUTES } from "~/constants/route-constant";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import EmptyLayout from "~/layouts/EmptyLayout/EmptyLayout";
import AccountPage from "~/pages/AccountPage/AccountPage";
import HomePage from "~/pages/HomePage/HomePage";
import InstallPage from "~/pages/InstallPage/InstallPage";
import InvestedDetailPage from "~/pages/InvestedDetailPage/InvestedDetailPage";
import InvestedListPage from "~/pages/InvestedListPage/InvestedListPage";
import LoginPage from "~/pages/LoginPage/LoginPage";
import NoticeDetailPage from "~/pages/NoticeDetailPage/NoticeDetailPage";
import NoticePage from "~/pages/NoticePage/NoticePage";
import PrivacyPage from "~/pages/PrivacyPage/PrivacyPage";
import ProductDetailPage from "~/pages/ProductDetailPage/ProductDetailPage";
import ProductListPage from "~/pages/ProductListPage/ProductListPage";
import TermPage from "~/pages/TermPage/TermPage";

const routesConfig = [
  {
    path: ROUTES.HOME,
    name: "home",
    layout: DefaultLayout,
    component: HomePage,
    private: true,
  },
  {
    path: ROUTES.ACCOUNT,
    name: "account",
    layout: DefaultLayout,
    component: AccountPage,
    private: true,
  },
  {
    path: ROUTES.NOTICE,
    name: "notice",
    layout: DefaultLayout,
    component: NoticePage,
    private: true,
  },
  {
    path: ROUTES.DETAIL_NOTICE,
    name: "detail-notice",
    layout: DefaultLayout,
    component: NoticeDetailPage,
    private: true,
  },
  {
    path: ROUTES.PROJECT_DETAIL,
    name: "detail-product",
    layout: DefaultLayout,
    component: ProductDetailPage,
    private: true,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.INVEST_LIST,
    name: "invested-list",
    layout: DefaultLayout,
    component: InvestedListPage,
    private: true,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.DETAIL_INVEST,
    name: "invested-detail",
    layout: DefaultLayout,
    component: InvestedDetailPage,
    private: true,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.PROJECT_LIST,
    name: "product-list",
    layout: DefaultLayout,
    component: ProductListPage,
    private: true,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.PRIVACY,
    name: "privacy",
    layout: DefaultLayout,
    component: PrivacyPage,
    private: true,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.TERMS,
    name: "terms",
    layout: DefaultLayout,
    component: TermPage,
    private: true,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.LOGIN,
    name: "login",
    layout: EmptyLayout,
    component: LoginPage,
    private: false,
  },
  {
    path: ROUTES.INSTALL,
    name: "install",
    layout: EmptyLayout,
    component: InstallPage,
    private: false,
  }
];

export default routesConfig;
