import { BellOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { ROUTES } from "~/constants/route-constant";

export default function BottomTabs() {
  const getLinkClass = ({ isActive }) =>
    `flex flex-col items-center gap-1 ${
      isActive ? "text-[#0073f6]" : "text-gray-500"
    }`;
  return (
    <div
      className="fixed bottom-0 left-0 right-0 px-4 py-2 flex items-center justify-center bg-white z-50"
      style={{ borderTop: "1px solid #f0f0f0" }}
    >
      <div className="w-full flex justify-between">
        <NavLink to={ROUTES.HOME} className={getLinkClass}>
          <HomeOutlined />
          <p className="text-xs">Trang chủ</p>
        </NavLink>
        <NavLink to={ROUTES.ACCOUNT} className={getLinkClass}>
          <UserOutlined />
          <p className="text-xs">Tài khoản</p>
        </NavLink>
        <NavLink to={ROUTES.NOTICE} className={getLinkClass}>
          <BellOutlined />
          <p className="text-xs">Thông báo</p>
        </NavLink>
      </div>
    </div>
  );
}
