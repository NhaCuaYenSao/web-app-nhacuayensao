import { Button, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { walletApi } from "~/apis/WalletApi";
import Header from "~/components/Header/Header";
import { ROUTES } from "~/constants/route-constant";
import { formatCurrency, formatNumber } from "~/utils/FormatCurrency";

export default function ConfirmWithdrawPage() {
  const {
    token: { accessToken },
  } = useSelector((state) => state.auth);
  const config = useSelector((state) => state.configSystem);
  const [amount, setAmount] = useState("");
  const [amountAfterFee, setAmountAfterFee] = useState("0");
  const navigate = useNavigate();
  const { bankId } = useParams();
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);

  console.log(config);

  const handleAmountChange = (value) => {
    // Remove all non-digit characters including VNĐ
    const numberOnly = value.replace(/[^\d]/g, "");

    if (numberOnly) {
      const fee = (parseInt(numberOnly) * (0.5 / 100)).toFixed(0);
      const formatted = new Intl.NumberFormat("vi-VN").format(numberOnly);
      setAmountAfterFee(
        new Intl.NumberFormat("vi-VN").format(numberOnly - fee)
      );
      setAmount(formatted);
    } else {
      setAmount("");
      setAmountAfterFee("0");
    }
  };

  const handleWithdraw = async () => {
    // Withdraw logic here
    const reqAmount = Number(amount.replaceAll(".", ""));
    const reqBankId = Number(bankId);

    // Validate numbers
    if (isNaN(reqAmount) || isNaN(reqBankId)) {
      message.error("Dữ liệu không hợp lệ");
      return;
    }

    if (reqAmount <= 0) {
      message.error("Số tiền rút phải lớn hơn 0");
      return;
    }

    if (reqAmount < Number(config.minWithdraw)) {
      message.error(
        `Số tiền rút tối thiểu là ${formatNumber(
          Number(config.minWithdraw)
        )} VNĐ`
      );
      return;
    }

    if (reqAmount > Number(config.maxWithdraw)) {
      message.error(
        `Số tiền rút tối đa là ${formatNumber(Number(config.maxWithdraw))} VNĐ`
      );
      return;
    }

    const data = { amount: reqAmount, bankId: parseInt(bankId) };
    setLoadingWithdraw(true);
    try {
      await walletApi.withdrawAPI(accessToken, data);
      navigate(ROUTES.SUCCESS_PAGE, {
        state: {
          msg: "Rút tiền thành công",
        },
      });
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message || "Rút tiền thất bại");
    } finally {
      setLoadingWithdraw(false);
    }
  };

  return (
    <div>
      <Header title="Rút tiền tài khoản"></Header>
      <div>
        <section className="mt-14">
          <h2 className="text-base font-bold mb-3">Số lượng</h2>
          <input
            type="text"
            placeholder="0 VNĐ"
            inputMode="numeric"
            pattern="[0-9]*"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="font-bold text-[40px] w-[80%] mx-auto block text-center"
          />
          {amount && (
            <span className="text-center w-full block font-bold text-base text-gray-400">
              VNĐ
            </span>
          )}
        </section>

        <section className="mt-20">
          <h2 className="text-base font-bold mb-3">Hóa đơn</h2>

          <div>
            <div className="flex justify-between mb-5">
              <span>Số tiền rút</span>
              <span>{amount || 0} VNĐ</span>
            </div>
            <div className="flex justify-between mb-5">
              <span>Phí giao dịch</span>
              <span>{Number(config.withdrawFee).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between mb-5">
              <span>Số tiền nhận được</span>
              <span>{formatCurrency(amountAfterFee)} VNĐ</span>
            </div>
          </div>
        </section>

        <section className="fixed bottom-2 left-0 right-0 p-4">
          {/* <PrimaryButton onClick={handleWithdraw}>Tiếp tục</PrimaryButton> */}
          <Button
            type="primary"
            size="large"
            shape="round"
            onClick={handleWithdraw}
            className="w-full"
            loading={loadingWithdraw}
          >
            Tiếp tục
          </Button>
        </section>
      </div>
    </div>
  );
}
