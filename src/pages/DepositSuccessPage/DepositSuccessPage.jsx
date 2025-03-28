import { Button } from "antd";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { payOsApi } from "~/apis/PayOSApi";
import { walletApi } from "~/apis/WalletApi";
import { ROUTES } from "~/constants/route-constant";
import { formatCurrency } from "~/utils/FormatCurrency";

export default function DepositSuccessPage() {
  const {
    token: { accessToken },
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const [infoDeposit, setInfoDeposit] = useState(null);

  useEffect(() => {
    const f = async () => {
      const transactionId = queryParams.get("id");
      const res = await payOsApi.checkTransactionStatus(transactionId);
      console.log(res);
      if (res.code === "00") {
        try {
          await walletApi.depositAPI(accessToken, {
            amount: res.data?.amount,
            transactionId,
          });
          setInfoDeposit(res.data);
          navigate(ROUTES.HOME);
        } catch (error) {
          console.log("error", error);
        }
      }
    };
    f();
  }, [accessToken]);

  useEffect(() => {
    // Tạo hiệu ứng pháo hoa khi component mount
    const duration = 0.1 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    const firework = () => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return;

      const particleCount = 50;
      confetti({
        startVelocity: 25,
        spread: 360,
        ticks: 100,
        zIndex: 0,
        particleCount,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2,
        },
      });

      if (timeLeft > 0) {
        requestAnimationFrame(firework);
      }
    };

    firework();
  }, []);

  return (
    <div className="py-28">
      <h1 className="text-center text-[40px]">Chúc mừng!</h1>
      <div className="w-full flex justify-center mt-8">
        <img src="/images/add-bank-success.svg" alt="" className="w-full" />
      </div>
      <div className="mt-12">
        <p className="text-center">
          Nạp tiền thành công với số tiền{" "}
          {formatCurrency(Number(infoDeposit?.amount))} VNĐ
        </p>
      </div>
      <div className="mt-12 px-4">
        {/* <Link to={ROUTES.HOME}>
          <PrimaryButton>Tuyệt vời</PrimaryButton>
        </Link> */}
        <Button
          size="large"
          type="primary"
          onClick={() => {
            navigate(ROUTES.HOME);
          }}
          className="w-full"
          shape="round"
        >
          Tuyệt vời
        </Button>
      </div>
    </div>
  );
}
