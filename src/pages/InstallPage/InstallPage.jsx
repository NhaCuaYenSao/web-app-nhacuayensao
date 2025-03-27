import { Button, Carousel } from "antd";
import { useEffect, useState } from "react";
import { DownloadOutlined } from '@ant-design/icons';

export default function InstallPage() {
  const settings = {
    dots: false,
    arrows: true,
    draggable: true,
    slidesToShow: 1,
    infinite: true,
  };
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log("User choice:", outcome);
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return (
    <div className="max-w-[400px] mx-auto bg-[url('install/bg-main.png')] bg-cover bg-center">
      <div className="relative py-4 px-2">
        <div className="absolute top-0 left-0 w-full h-full">
          <img src="install/bg-01.svg" alt="Nhà của yến sào" />
        </div>
        <div className="flex justify-center">
          <img src="install/logo.svg" alt="Nhà của yến sào" />
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-0 right-0">
          <img src="install/bg-02.svg" alt="Nhà của yến sào" />
        </div>
        <div className="flex justify-center">
          <img src="install/app-frame.svg" alt="app Nhà của Yến Sào" />
        </div>

      </div>
      <div className="text-center px-2 max-w-[320px] mx-auto">
        <h1 className="font-medium text-[24px] mb-2">Nhà của Yến Sào APP</h1>
        <div className="text-[12px] mb-1.5 text-[#A07F23]">
          <span>Nhà của Yến Sào – Trải nghiệm đầu tư nhẹ nhàng, sinh lời bền vững cùng tổ yến</span>
        </div>
        <div className="text-[10px]">
          <span>
          Tham gia ngay hành trình 7 ngày cùng Nhà của Yến Sào – nơi bạn không cần bỏ ra hàng chục triệu đồng vẫn có thể đồng hành cùng một mô hình sinh lời bền vững từ yến sào. Chỉ từ 1 triệu VNĐ, bạn sẽ được trải nghiệm cách tài sản của mình có thể sinh lãi nhẹ nhàng mỗi ngày. Không cam kết lợi nhuận ảo, chỉ minh bạch – rõ ràng – thực tế!
          </span>
        </div>
        <div className="text-center my-4">
          <Button icon={<DownloadOutlined />} onClick={handleInstallClick}>Tải xuống</Button>
        </div>
      </div>
      <div className="py-5 install-carousel">
        <Carousel {...settings}>
          <div className="px-7">
            <img src="install/home.svg" alt="Nhà của Yến Sào APP" />
          </div>
          <div className="px-7">
            <img src="install/note.svg" alt="Nhà của Yến Sào APP" />
          </div>
          <div className="px-7">
            <img src="install/deposit.svg" alt="Nhà của Yến Sào APP" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
