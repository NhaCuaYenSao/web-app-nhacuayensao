import { Button, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { investmentApi } from "~/apis/InvestmentApi";
import Header from "~/components/Header/Header";
import { ROUTES } from "~/constants/route-constant";
import { formatNumber } from "~/utils/FormatCurrency";

export default function WithdrawInvestPage() {
  const {
    token: { accessToken },
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { type } = useParams();
  const location = useLocation();
  const productFromState = location.state?.product;
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      if (type === "FULL") {
        await investmentApi.withdrawFull(accessToken, {
          productId: Number(productFromState?.id),
        });
      } else {
        await investmentApi.withdrawRate(accessToken, {
          productId: Number(productFromState?.id),
        });
      }

      message.success("Rút tiền thành công");

      navigate(ROUTES.WITHDRAW_SUCCESS);
    } catch {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title="Rút tiền về ví" />
      <div className="mt-14 px-4">
        <h2 className="text-base font-bold mb-3">Hóa đơn</h2>
        <section className="flex flex-col gap-4 items-center justify-center">
          <div className="flex justify-between items-center w-full">
            <p>Loại hình</p>
            <p>{type === "FULL" ? "Rút tiền gốc + lãi" : "Rút lãi"}</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p>Số tiền đầu tư</p>
            <p>
              <span>
                {formatNumber(Number(productFromState?.remainingAmount))}
              </span>{" "}
              <span>VNĐ</span>
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p>Số tiền lãi</p>
            <p>
              <span>
                {formatNumber(Number(productFromState?.rateAmount).toFixed(0))}
              </span>{" "}
              <span>VNĐ</span>
            </p>
          </div>
          {type === "FULL" && (
            <div className="flex justify-between items-center w-full">
              <p>Tổng tiền</p>
              <p>
                <span>
                  {formatNumber(
                    Number(productFromState?.remainingAmount) +
                      Number(productFromState?.rateAmount)
                  )}
                </span>{" "}
                <span>VNĐ</span>
              </p>
            </div>
          )}
          <div className="flex justify-between items-center w-full">
            <p>Phí giao dịch</p>
            <p>
              <span>{Number(productFromState?.withdrawalFee)}</span>{" "}
              <span>%</span>
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p>Số tiền nhận được</p>
            <p>
              <span>
                {type === "FULL"
                  ? formatNumber(
                      Number(
                        Number(productFromState?.remainingAmount) +
                          productFromState?.rateAmount -
                          (Number(productFromState?.remainingAmount) +
                            productFromState?.rateAmount) *
                            (productFromState?.withdrawalFee / 100)
                      )
                    )
                  : formatNumber(
                      Number(
                        Number(productFromState?.rateAmount).toFixed(0) -
                          (productFromState?.rateAmount *
                            productFromState?.withdrawalFee) /
                            100
                      ).toFixed(0)
                    )}
              </span>{" "}
              <span>VNĐ</span>
            </p>
          </div>
        </section>

        <section className="fixed bottom-2 left-0 right-0 p-4">
          <Button
            type="primary"
            shape="round"
            size="large"
            className="w-full"
            onClick={handleWithdraw}
            loading={loading}
          >
            Tiếp tục
          </Button>
        </section>
      </div>
    </div>
  );
}
