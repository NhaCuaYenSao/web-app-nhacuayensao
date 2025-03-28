import { Button, Input, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { authApi } from "~/apis/AuthApi";
import { OTPAPI } from "~/apis/OTPAPI";
import { ArrowLeftIcon } from "~/components/Icons/Icons";
import { ROUTES } from "~/constants/route-constant";

export default function OTPPage() {
  const {
    token: { accessToken },
  } = useSelector((state) => state.auth);
  const { type } = useParams();
  const { state } = useLocation();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log("state", state);

  const handleSubmit = async () => {
    setLoading(true);
    const otpValue = otp;

    switch (type) {
      case "LOGIN":
        navigate(ROUTES.HOME);
        break;
      case "REGISTER":
        try {
          await verifyOtp({ email: state.registerData.email, otp: otpValue });
          await registerAPI({
            email: state.registerData.email,
            phoneNumber: state.registerData.phoneNumber,
            password: state.registerData.password,
          });
          navigate(ROUTES.AUTH_SUCCESS);
        } catch (error) {
          showToast({
            message: error.response.data.message || "Đăng ký thất bại",
            fail: true,
          });
          navigate(ROUTES.REGISTER, { replace: true });
        }
        break;
      case "FORGOT_PASSWORD": {
        try {
          await OTPAPI.verifyOtp({ email: state.email, otp: otpValue });
          message.success("Xác thực thành công");
          navigate(ROUTES.RESET_PASSWORD, { state: { email: state.email } });
        } catch (error) {
          message.error(
            error.response.data.message || "Mã OTP không chính xác"
          );
        }
        break;
      }
      case "CHANGE_PASSWORD": {
        try {
          await OTPAPI.verifyOtp({ email: state?.email, otp: otpValue });
          await authApi.changePasswordApi(accessToken, {
            newPassword: state?.newPassword,
            oldPassword: state?.oldPassword,
          });
          message.success("Đổi mật khẩu thành công");
          navigate(ROUTES.HOME);
        } catch (error) {
          console.log(error);
          message.error(
            error.response.data.message || "Mã OTP không chính xác"
          );
        }
        break;
      }
      default:
        break;
    }
  };

  const handleChangeOtp = (text) => {
    setOtp(text);
  };

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center">
        <img src="/images/logo.png" alt="" className="text-center" />
      </div>

      <div className="py-2 ml-[38px] mr-[38px]">
        <div className="text-center">
          <h2 className="text-[20px] font-medium">Xác thực mã OTP</h2>
          <p className="mt-4 font-medium text-base">
            Mã xác thực đã được gửi qua Email
          </p>
        </div>

        <div className="mt-12 flex gap-2 items-center justify-center">
          <Input.OTP
            type="number"
            size="large"
            length={4}
            onChange={handleChangeOtp}
          />
        </div>
        <div className="mt-36">
          {/* <button
            className="w-full bg-[#20695E] p-4 text-base text-white rounded-full"
            onClick={handleSubmit}
          >
            Xác nhận
          </button> */}
          <Button
            type="primary"
            shape="round"
            size="large"
            className="w-full"
            onClick={() => {
              handleSubmit();
            }}
            loading={loading}
          >
            Xác nhận
          </Button>
        </div>
      </div>
      <div className="fixed top-[20px] left-[20px] text-center mb-5">
        <button
          onClick={() => navigate(-1)}
          className="text-center shadow w-[40px] h-[40px] rounded-full flex items-center justify-center"
        >
          <ArrowLeftIcon />
        </button>
      </div>
    </div>
  );
}
