import { Button } from "antd";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "~/constants/route-constant";

export default function SuccessPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

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
        <p className="text-center">{state?.msg}</p>
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
