import { ROUTES } from "~/constants/route-constant";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import EmptyLayout from "~/layouts/EmptyLayout/EmptyLayout";
import AccountPage from "~/pages/AccountPage/AccountPage";
import AddCardPage from "~/pages/AddCardPage/AddCardPage";
import ChangePasswordPage from "~/pages/ChangePassword/ChangePassword";
import ChoiceCardBankPage from "~/pages/ChoiceCardBankPage/ChoiceCardBankPage";
import ChoiceCardDepositPage from "~/pages/ChoiceCardDepositPage/ChoiceCardDepositPage";
import ConfirmDepositPage from "~/pages/ConfirmDepositPage/ConfirmDepositPage";
import ConfirmWithdrawPage from "~/pages/ConfirmWithdraw/ConfirmWithdraw";
import DepositPage from "~/pages/DepositPage/DepositPage";
import DepositSuccessPage from "~/pages/DepositSuccessPage/DepositSuccessPage";
import ForgotPassword from "~/pages/ForgotPassword/ForgotPassword";
import HomePage from "~/pages/HomePage/HomePage";
import InstallPage from "~/pages/InstallPage/InstallPage";
import InvestedDetailPage from "~/pages/InvestedDetailPage/InvestedDetailPage";
import InvestedListPage from "~/pages/InvestedListPage/InvestedListPage";
import LoginPage from "~/pages/LoginPage/LoginPage";
import LoginSecurityPage from "~/pages/LoginSercurityPage/LoginSercurityPage";
import NoticeDetailPage from "~/pages/NoticeDetailPage/NoticeDetailPage";
import NoticePage from "~/pages/NoticePage/NoticePage";
import OTPPage from "~/pages/OTPPage/OTPPage";
import PrivacyPage from "~/pages/PrivacyPage/PrivacyPage";
import ProductDetailPage from "~/pages/ProductDetailPage/ProductDetailPage";
import ProductListPage from "~/pages/ProductListPage/ProductListPage";
import RegisterPage from "~/pages/RegisterPage/RegisterPage";
import ResetPassword from "~/pages/ResetPassword/ResetPassword";
import SettingPaymentMethod from "~/pages/SettingPaymentMethodPage/SettingPaymentMethodPage";
import SuccessPage from "~/pages/SuccessPage/SuccessPage";
import TermPage from "~/pages/TermPage/TermPage";
import WithdrawInvestPage from "~/pages/WithdrawInvestedPage/WithdrawInvestedPage";
import WithdrawPage from "~/pages/WithdrawPage/WithdrawPage";

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
    path: ROUTES.SETTING_PAYMENT_METHOD,
    name: "setting-payment-method",
    layout: DefaultLayout,
    component: SettingPaymentMethod,
    private: true,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.CHOICE_CARD_BANK,
    name: "choice-card-bank",
    layout: DefaultLayout,
    component: ChoiceCardBankPage,
    private: true,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.ADD_CARD,
    name: "add-card",
    layout: DefaultLayout,
    component: AddCardPage,
    private: true,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.SUCCESS_PAGE,
    name: "success-page",
    layout: DefaultLayout,
    component: SuccessPage,
    private: true,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.CONFIRM_WITHDRAW,
    name: "confirm-withdraw",
    layout: DefaultLayout,
    component: ConfirmWithdrawPage,
    private: true,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.WITHDRAW,
    name: "withdraw",
    layout: DefaultLayout,
    component: WithdrawPage,
    private: true,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.LOGIN_SECURITY,
    name: "login-security",
    layout: DefaultLayout,
    component: LoginSecurityPage,
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
    path: ROUTES.CHANGE_PASSWORD,
    name: "change-password",
    layout: DefaultLayout,
    component: ChangePasswordPage,
    private: true,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.DEPOSIT_SUCCESS,
    name: "deposit-success",
    layout: DefaultLayout,
    component: DepositSuccessPage,
    private: false,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    name: "forgot-password",
    layout: EmptyLayout,
    component: ForgotPassword,
    private: false,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    name: "reset-password",
    layout: EmptyLayout,
    component: ResetPassword,
    private: false,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.DEPOSIT,
    name: "deposit",
    layout: DefaultLayout,
    component: DepositPage,
    private: false,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.OTP,
    name: "otp",
    layout: DefaultLayout,
    component: OTPPage,
    private: false,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.WITHDRAW_INVEST,
    name: "withdraw-invest",
    layout: DefaultLayout,
    component: WithdrawInvestPage,
    private: true,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.CHOICE_CARD_DEPOSIT,
    name: "choice-card-deposit",
    layout: DefaultLayout,
    component: ChoiceCardDepositPage,
    private: true,
    isShowBottomNav: false,
  },
  {
    path: ROUTES.CONFIRM_DEPOSIT,
    name: "confirm-deposit",
    layout: DefaultLayout,
    component: ConfirmDepositPage,
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
  },
  {
    path: ROUTES.REGISTER,
    name: "register",
    layout: EmptyLayout,
    component: RegisterPage,
    private: false,
  }
];

export default routesConfig;
