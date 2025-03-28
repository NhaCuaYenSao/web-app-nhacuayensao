import { Link } from "react-router-dom";
import Header from "~/components/Header/Header";
import { ArrowRightFill } from "~/components/Icons/Icons";
import { ROUTES } from "~/constants/route-constant";

export default function ChoiceCardDepositPage() {
  return (
    <div>
      <Header title="Nạp tiền vào ví"></Header>
      <div className="mt-14 px-4">
        <section>
          <h2 className="text-base font-bold mb-3">Chọn ngân hàng</h2>
          <div className="flex flex-col gap-2 items-center justify-center">
            <Link
              to={ROUTES.CONFIRM_DEPOSIT}
              className="p-4 rounded-xl flex items-center justify-between w-full"
              style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-[0.5px] w-10 h-10 rounded-[50%] overflow-hidden flex items-center justify-center"
                  style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
                >
                  <img src="https://api.vietqr.io/img/VPB.png" alt="" />
                </div>
                <div>
                  <p className="text-xs font-bold">VP Bank</p>
                  <p className="text-xs">Ngân hàng TMCP Việt Nam Thịnh Vượng</p>
                </div>
              </div>
              <div>
                <ArrowRightFill color="#616161" />
              </div>
            </Link>
            <Link
              to={ROUTES.CONFIRM_DEPOSIT}
              className="p-4 rounded-xl flex items-center justify-between w-full"
              style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-[0.5px] w-10 h-10 rounded-[50%] overflow-hidden flex items-center justify-center"
                  style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
                >
                  <img src="https://api.vietqr.io/img/STB.png" alt="" />
                </div>
                <div>
                  <p className="text-xs font-bold">Sacombank</p>
                  <p className="text-xs">Ngân hàng TMCP Sài Gòn Thương Tín</p>
                </div>
              </div>
              <div>
                <ArrowRightFill color="#616161" />
              </div>
            </Link>
            <Link
              to={ROUTES.CONFIRM_DEPOSIT}
              className="p-4 rounded-xl flex items-center justify-between w-full"
              style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-[0.5px] w-10 h-10 rounded-[50%] overflow-hidden flex items-center justify-center"
                  style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
                >
                  <img src="https://api.vietqr.io/img/MB.png" alt="" />
                </div>
                <div>
                  <p className="text-xs font-bold">MB Bank</p>
                  <p className="text-xs">Ngân hàng TMCP Quân đội</p>
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
