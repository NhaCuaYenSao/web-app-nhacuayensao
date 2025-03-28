import { Link } from "react-router-dom";
import Header from "~/components/Header/Header";
import {
  ArrowRightFill,
  KYCIcon,
  PasswordIcon,
} from "~/components/Icons/Icons";
import { ROUTES } from "~/constants/route-constant";

export default function LoginSecurityPage() {
  return (
    <div>
      <Header title="Đăng nhập và bảo mật"></Header>
      <div className="mt-14">
        <section className="flex flex-col items-center justify-center gap-4">
          <Link
            to={ROUTES.KYC_INFO}
            className="w-full flex items-center justify-between p-4 pr-6 rounded-md"
            style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
          >
            <div className="flex items-center gap-6">
              <KYCIcon />
              <span className="text-base">Thông tin KYC</span>
            </div>
            <ArrowRightFill color={"#616161"} />
          </Link>
          <Link
            to={ROUTES.CHANGE_PASSWORD}
            className="w-full flex items-center justify-between p-4 pr-6 rounded-md"
            style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
          >
            <div className="flex items-center gap-6">
              <PasswordIcon />
              <span className="text-base">Thay đổi mật khẩu</span>
            </div>
            <ArrowRightFill color={"#616161"} />
          </Link>
        </section>
      </div>
    </div>
  );
}
