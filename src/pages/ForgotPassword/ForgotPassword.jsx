import { zodResolver } from "@hookform/resolvers/zod";
import { Button, message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { OTPAPI } from "~/apis/OTPAPI";
import { ArrowLeftIcon } from "~/components/Icons/Icons";
import { ROUTES } from "~/constants/route-constant";

const formSchema = z.object({
  email: z.string(),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await OTPAPI.sendOtp({
        email: data.email,
      });
      navigate(ROUTES.OTP.replace(":type", "FORGOT_PASSWORD"), {
        state: { email: data.email },
      });
    } catch {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="ml-[38px] mr-[38px]">
        <div className="flex flex-col justify-center items-center">
          <img src="/images/logo.png" alt="" className="text-center" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="#" className="text-base font-semibold">
              Email
            </label>
            <div
              className="rounded-full"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.10)" }}
            >
              <input
                type="email"
                {...register("email")}
                className="outline-none bg-transparent w-[318px] h-[48px] px-4"
              />
            </div>
            <span className="text-red-500 text-xs font-medium ml-3">
              {errors.email && errors.email.message}
            </span>
          </div>

          <div className="mt-12">
            <Button
              htmlType="submit"
              className="w-full"
              type="primary"
              shape="round"
              size="large"
              loading={loading}
            >
              Đăng ký
            </Button>
            {/* <button className="w-full bg-[#20695E] p-4 text-base text-white rounded-full">
              Tiếp tục
            </button> */}
          </div>
        </form>
      </div>
      <div className="fixed top-[20px] left-[20px] text-center mb-5">
        <Link
          to="/"
          className="text-center shadow w-[40px] h-[40px] rounded-full flex items-center justify-center"
        >
          <ArrowLeftIcon />
        </Link>
      </div>
    </>
  );
}
