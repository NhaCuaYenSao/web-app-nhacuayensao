import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Header({ title = "NHÀ CỦA YẾN SÀO", isBack = true }) {
  const navigate = useNavigate();
  const handleBack = () => {
    console.log(123);
    navigate(-1);
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div
        className={`flex ${
          isBack ? "justify-between" : "justify-center"
        } items-center py-1 px-2`}
        style={{ borderBottom: "1px solid #E5E7EB" }}
      >
        {isBack && (
          <button onClick={handleBack}>
            <ArrowLeftOutlined />
          </button>
        )}
        <p className="text-[18px] text-center font-bold">{title}</p>
        {isBack && (
          <button>
            <img width={16} height={16} src="/images/logo.svg" alt="" />
          </button>
        )}
      </div>
    </div>
  );
}
