import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "~/constants/route-constant";
import { formatCurrency } from "~/utils/FormatCurrency";
import { AirplaneIcon, QRCodeIcon } from "../Icons/Icons";
import { Skeleton } from "antd";

export default function Wallet({ balance = 0, isLoading = false }) {
  const navigate = useNavigate();

  const handleCreateOrder = async () => {
    // // Gọi API mở trang lựa chọn phương thức thanh toán
    // Payment.selectPaymentMethod({
    //   channels: [
    //     {
    //       method: "BANK",
    //       subMethod: "TCB",
    //       subInfo: "Ngân hàng Techcombank",
    //     },
    //   ],
    //   success: (data) => {
    //     navigate(ROUTES.CONFIRM_DEPOSIT, { state: data });
    //   },
    //   fail: (err) => {
    //     // Tắt trang lựa chọn phương thức hoặc xảy ra lỗi
    //     console.log(err);
    //   },
    // });
  };

  return (
    <article
      className="bg-white p-5 rounded-2xl"
      style={{ boxShadow: "0px 1px 4.3px 0px rgba(0, 0, 0, 0.15)" }}
    >
      <p className="text-base mb-2">Số dư hiện có</p>
      <div className="flex items-center justify-between mb-8">
        {isLoading ? (
          <Skeleton paragraph={{ rows: 1 }} width={200} height={30}></Skeleton>
        ) : (
          <p className="text-3xl">
            {formatCurrency(Number(balance).toFixed(2))} VNĐ
          </p>
        )}
        {/* <p className="text-[14px] font-semibold text-[#20695E] bg-[#00FF2F26] px-3 py-1 rounded-full">
          +5.21%
        </p> */}
      </div>
      <div className="flex items-center justify-between gap-3">
        <Link
          to={ROUTES.DEPOSIT}
          className="w-1/2 flex items-center justify-center gap-2 bg-[#20695E] p-4 rounded-full text-white text-base font-bold"
        >
          <AirplaneIcon />
          <span>Nạp tiền</span>
        </Link>
        {/* <button
          onClick={handleCreateOrder}
          className="w-1/2 flex items-center justify-center gap-2 bg-[#20695E] p-4 rounded-full text-white text-base font-bold"
        >
          <AirplaneIcon />
          <span>Nạp tiền</span>
        </button> */}
        <Link
          to={ROUTES.WITHDRAW}
          className="w-1/2 flex items-center justify-center gap-2 bg-white p-4 rounded-full text-black text-base font-bold"
          style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <QRCodeIcon />
          <span>Rút tiền</span>
        </Link>
      </div>
    </article>
  );
}
