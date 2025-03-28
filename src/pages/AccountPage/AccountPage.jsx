import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "~/apis/AuthApi";
import { walletApi } from "~/apis/WalletApi";
import {
  ArrowRightFill,
  DollarFillIcon,
  ExportIcon,
  UserIcon,
  VoucherFillIcon,
} from "~/components/Icons/Icons";
import Wallet from "~/components/Wallet/Wallet";
import { ROUTES } from "~/constants/route-constant";
import { logout } from "~/features/Auth/AuthSlide";
import { redirectToDeviceBrowser } from "~/utils/RedirectToDeviceBrowser";

export default function AccountPage() {
  const {
    user,
    token: { accessToken },
  } = useSelector((state) => state.auth);
  const config = useSelector((state) => state.configSystem);

  console.log("config", config);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const f = async () => {
      const res = await walletApi.getWalletByUserIdAPI(accessToken);
      setWallet(res.data);
    };
    f();
  }, [accessToken]);

  const handleLogout = async () => {
    try {
      await authApi.logoutAPI(accessToken);
      dispatch(logout());
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-center text-base font-bold text-black">
          Tài khoản của tôi
        </h1>
        <div className="flex flex-col items-center justify-center gap-4">
          <img src="/images/avatar.svg" alt="" />
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-lg font-bold">{user?.fullName}</p>
            <div className="flex items-center gap-2">
              <p className="text-xs font-light">{user?.email}</p>{" "}
              {user?.kycStatus === "APPROVED" ? (
                <p className="text-xs font-semibold text-[#20695E] bg-[#00FF2F26] px-3 py-1 rounded-full">
                  Đã xác thực
                </p>
              ) : (
                <p className="text-xs font-semibold text-[#7D0A0A] bg-[#D8404026] px-3 py-1 rounded-full">
                  Chưa xác thực
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-base font-bold mb-4">Ví của tôi</h2>
        <Wallet balance={wallet?.balance} isLoading={!wallet} />
      </section>

      <section className="pb-4 mt-7 flex flex-col items-center justify-center gap-8">
        <Link
          to={ROUTES.LOGIN_SECURITY}
          className="w-full flex items-center justify-between p-4 pr-6 rounded-full"
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center gap-6">
            <UserIcon />
            <span className="text-base">Đăng nhập và bảo mật</span>
          </div>
          <ArrowRightFill color={"#616161"} />
        </Link>
        <Link
          to={ROUTES.SETTING_PAYMENT_METHOD}
          className="w-full flex items-center justify-between p-4 pr-6 rounded-full"
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center gap-6">
            <img src="/images/wallet.svg" alt="" />
            <span className="text-base">Cài đặt thanh toán</span>
          </div>
          <ArrowRightFill color={"#616161"} />
        </Link>
        <Link
          to={ROUTES.INVEST_LIST}
          className="w-full flex items-center justify-between p-4 pr-6 rounded-full"
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center gap-6">
            <DollarFillIcon />
            <span className="text-base">Đầu tư của tôi</span>
          </div>
          <ArrowRightFill color={"#616161"} />
        </Link>
        <Link
          to={ROUTES.MY_VOUCHER}
          className="w-full flex items-center justify-between p-4 pr-6 rounded-full"
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center gap-6">
            <VoucherFillIcon />
            <span className="text-base">Voucher của tôi</span>
          </div>
          <ArrowRightFill color={"#616161"} />
        </Link>
        <a
          target="_blank"
          className="w-full flex items-center justify-between p-4 pr-6 rounded-full"
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
          href={config?.linkSupport}
        >
          <div className="flex items-center gap-6">
            <img src="/images/chat.svg" alt="" />
            <span className="text-base">Trung tâm tư vấn</span>
          </div>
          <ArrowRightFill color={"#616161"} />
        </a>
        <Link
          to={ROUTES.PRIVACY}
          className="w-full flex items-center justify-between p-4 pr-6 rounded-full"
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center gap-6">
            <img src="/images/privacy.svg" alt="" />
            <span className="text-base">Chính sách bảo mật</span>
          </div>
          <ArrowRightFill color={"#616161"} />
        </Link>
        <Link
          to={ROUTES.TERMS}
          className="w-full flex items-center justify-between p-4 pr-6 rounded-full"
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center gap-6">
            <img src="/images/privacy.svg" alt="" />
            <span className="text-base">Điều khoản và chính sách</span>
          </div>
          <ArrowRightFill color={"#616161"} />
        </Link>
        <button
          className="w-full flex items-center justify-between p-4 pr-6 rounded-full"
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
          onClick={handleLogout}
        >
          <div className="flex items-center gap-6">
            <ExportIcon />
            <span className="text-base">Đăng xuất</span>
          </div>
          <ArrowRightFill color={"#616161"} />
        </button>
      </section>
    </div>
  );
}
