import { Link } from "react-router-dom";
import Header from "~/components/Header/Header";
import { ArrowRightFill } from "~/components/Icons/Icons";
import { ROUTES } from "~/constants/route-constant";

export default function DepositPage() {
  return (
    <div>
      <Header title="Nạp tiền vào ví"></Header>
      <div className="mt-14 px-4">
        <section>
          <h2 className="text-base font-bold mb-3">
            Chọn phương thức thanh toán
          </h2>
          <div className="flex flex-col gap-2 items-center justify-center">
            <Link
              to={ROUTES.CONFIRM_DEPOSIT}
              className="p-4 rounded-xl flex items-center justify-between w-full"
              style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-2 w-10 h-10 rounded-[50%] overflow-hidden flex items-center justify-center"
                  style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
                >
                  <img src="/images/mastercard.svg" alt="" />
                </div>
                <div>
                  <p className="text-xs font-bold">Chuyển khoản ngân hàng</p>
                  <p className="text-xs">
                    Sử dụng Visa& Mastercard, và nhiều hơn nữa
                  </p>
                </div>
              </div>
              <div>
                <ArrowRightFill color="#616161" />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
