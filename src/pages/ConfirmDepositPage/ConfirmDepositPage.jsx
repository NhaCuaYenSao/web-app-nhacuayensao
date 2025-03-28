import { Button } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { payOsApi } from "~/apis/PayOSApi";
import Header from "~/components/Header/Header";
import { generatePaymentSignature } from "~/utils/GeneratePaymentSignature";

export default function ConfirmDepositPage() {
  const { user } = useSelector((state) => state.auth);
  const [amount, setAmount] = useState("");

  const handleAmountChange = (value) => {
    // Remove all non-digit characters including VNĐ
    const numberOnly = value.replace(/[^\d]/g, "");

    if (numberOnly) {
      const formatted = new Intl.NumberFormat("vi-VN").format(numberOnly);
      setAmount(formatted);
    } else {
      setAmount("");
      //   setAmountAfterFee("0");
    }
  };

  const handleDeposit = async () => {
    try {
      const amountReq = Number(amount.replace(/\D/g, ""));
      const orderCode = Number(String(Date.now()).slice(-6));
      const expiredAt = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
      const returnUrl = import.meta.env.VITE_RETURN_URL_PAY_OS;
      const cancelUrl = import.meta.env.VITE_CANCEL_URL_PAY_OS;
      const reqAmount = amountReq;
      const signature = generatePaymentSignature(
        {
          orderCode,
          amount: reqAmount,
          description: "NT-" + orderCode,
          cancelUrl,
          returnUrl,
        },
        import.meta.env.VITE_CHECKSUM_KEY
      );
      const reqData = {
        orderCode,
        amount: reqAmount,
        description: "NT-" + orderCode,
        buyerName: user?.fullName,
        buyerEmail: user?.email,
        buyerPhone: user?.phoneNumber,
        buyerAddress: user?.address,
        items: [
          {
            name: "Nạp tiền vào ví",
            quantity: 1,
            price: reqAmount,
          },
        ],
        cancelUrl,
        returnUrl,
        expiredAt,
        signature,
      };
      const res = await payOsApi.createOrder(reqData);
      window.open(res.data.checkoutUrl, "_blank");
    } catch (error) {
      console.log(error);
    } finally {
      console.log(1);
    }
  };

  return (
    <div>
      <Header title="Nạp tiền vào ví"></Header>
      <div className="mt-14 px-4">
        {/* <section>
          <h2 className="text-base font-bold mb-3">
            Phương thức thanh toán của bạn
          </h2>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div
              className="p-4 rounded-xl flex items-center justify-between w-full"
              style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-[0.5px] w-10 h-10 rounded-[50%] overflow-hidden flex items-center justify-center"
                  style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
                >
                  <img src={bankInfo?.logo} alt="" />
                </div>
                <div>
                  <p className="text-xs font-bold">{bankInfo?.shortName}</p>
                  <p className="text-xs">
                    {bankInfo?.name} - {bankInfo?.code}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <section className="mt-4">
          <h2 className="text-base font-bold mb-3">Số lượng</h2>
          <input
            type="text"
            placeholder="0 VNĐ"
            inputMode="numeric"
            pattern="[0-9]*"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="font-bold text-[40px] w-[90%] mx-auto block text-center"
          />
          {amount && (
            <span className="text-center w-full block font-bold text-base text-gray-400">
              VNĐ
            </span>
          )}
        </section>
        {/* <section className="mt-4">
          <h2 className="text-base font-bold mb-3">Thông tin thanh toán</h2>

          <div id="qr-code" className="h-[500px] w-full"></div>
        </section> */}

        <section className="fixed bottom-2 left-0 right-0 p-4">
          {/* <PrimaryButton
            onClick={async () => {
              //   confirm();
            }}
          >
            Tiếp tục
          </PrimaryButton> */}
          <Button
            type="primary"
            shape="round"
            onClick={handleDeposit}
            size="large"
            className="w-full"
          >
            Tiếp tục
          </Button>
        </section>
      </div>
    </div>
  );
}
