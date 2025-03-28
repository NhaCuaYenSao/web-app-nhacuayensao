import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bankApi } from "~/apis/BankApi";
import Header from "~/components/Header/Header";
import { ROUTES } from "~/constants/route-constant";

export default function SettingPaymentMethod() {
  const {
    token: { accessToken },
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedBankId, setSelectedBankId] = useState(null);

  useEffect(() => {
    const f = async () => {
      const res = await bankApi.getAllBanksByUser(accessToken);
      setBanks(res.data);
    };
    f();
  }, [accessToken]);

  const handleDelete = (id) => {
    setSelectedBankId(id);
    setDialogVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log(banks.length);
      if (banks.length <= 1) {
        message.error("Bạn cần ít nhất một phương thức thanh toán");
      } else {
        await bankApi.deleteBank(accessToken, selectedBankId);
        setBanks((prev) => prev.filter((v) => v.id !== selectedBankId));
        message.success("Xóa thành công");
      }
      setDialogVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header title="Cài đặt thanh toán" />
      <div className="mt-14">
        <section className="flex flex-col items-center justify-center gap-4">
          {banks?.map((v) => (
            <div
              key={v?.id}
              className="py-4 pb-8 px-3 rounded-lg w-full"
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            >
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <p className="font-bold">{v?.name}</p>
                  <p className="text-[12px]">{v?.accountNumber}</p>
                  <p className="text-[12px] font-bold ">
                    {v?.accountName.toUpperCase()}
                  </p>
                </div>
                <div
                  className="min-w-[32px] w-[32px] h-[32px] rounded-[50%] flex items-center justify-center bg-gray-200"
                  onClick={() => handleDelete(v?.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_178_20754)">
                      <path
                        d="M6.01462 26.6499C6.04622 27.4046 6.66725 28.0002 7.4225 28.0002H20.5773C21.3325 28.0002 21.9536 27.4046 21.9852 26.6499L22.9246 6.81836H5.0752L6.01462 26.6499ZM16.9757 11.7442C16.9757 11.4282 17.2319 11.1719 17.548 11.1719H18.4635C18.7794 11.1719 19.0358 11.4281 19.0358 11.7442V23.0744C19.0358 23.3905 18.7796 23.6467 18.4635 23.6467H17.548C17.232 23.6467 16.9757 23.3906 16.9757 23.0744V11.7442ZM12.9699 11.7442C12.9699 11.4282 13.2261 11.1719 13.5422 11.1719H14.4576C14.7735 11.1719 15.0299 11.4281 15.0299 11.7442V23.0744C15.0299 23.3905 14.7737 23.6467 14.4576 23.6467H13.5422C13.2262 23.6467 12.9699 23.3906 12.9699 23.0744V11.7442ZM8.96396 11.7442C8.96396 11.4282 9.22019 11.1719 9.53626 11.1719H10.4518C10.7678 11.1719 11.0241 11.4281 11.0241 11.7442V23.0744C11.0241 23.3905 10.7678 23.6467 10.4518 23.6467H9.53626C9.22026 23.6467 8.96396 23.3906 8.96396 23.0744V11.7442Z"
                        fill="#868686"
                      />
                      <path
                        d="M23.5502 1.44242H17.4814V0.295092C17.4814 0.132157 17.3493 0 17.1863 0H10.8135C10.6506 0 10.5185 0.132157 10.5185 0.295092V1.44235H4.44968C3.96128 1.44235 3.56543 1.83827 3.56543 2.32667V5.10464H24.4344V2.32674C24.4344 1.83834 24.0386 1.44242 23.5502 1.44242Z"
                        fill="#868686"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_178_20754">
                        <rect width="28" height="28" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="w-[50%] mx-auto mt-4">
                <img src={v?.logo} className="w-full" alt="" />
              </div>
            </div>
          ))}
        </section>
        <div className="mt-4">
          <Button
            type="primary"
            className="w-full"
            shape="round"
            size="large"
            onClick={() => {
              navigate(ROUTES.CHOICE_CARD_BANK);
            }}
          >
            Thêm thẻ mới
          </Button>
        </div>

        <section>
          <Modal
            open={dialogVisible}
            title="Thông báo"
            onOk={() => {
              handleConfirmDelete();
            }}
            onCancel={() => {
              setDialogVisible(false);
            }}
          >
            <p>Bạn muốn xóa chứ ?</p>
          </Modal>
        </section>
      </div>
    </div>
  );
}
