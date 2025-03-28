import { zodResolver } from "@hookform/resolvers/zod";
import { Button, message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { authApi } from "~/apis/AuthApi";
import { ROUTES } from "~/constants/route-constant";

const formSchema = z.object({
  password: z.string(),
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authApi.forgotPasswordApi({
        email: state.email,
        password: data.password,
      });
      message.success("Đổi mật khẩu thành công");
      navigate(ROUTES.SUCCESS_PAGE, {
        state: {
          msg: "Đổi mật khẩu thành công",
        },
      });
    } catch (error) {
      console.log(error);
      message.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-[38px] mr-[38px]">
      <div className="flex flex-col justify-center items-center">
        <img src="/images/logo.png" alt="" className="text-center" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="#" className="text-base font-semibold">
            Mật khẩu mới của bạn
          </label>
          <div
            className="rounded-full"
            style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.10)" }}
          >
            <input
              type="password"
              {...register("password")}
              className="outline-none bg-transparent w-[318px] h-[48px] px-4"
            />
          </div>
          <span className="text-red-500 text-xs font-medium ml-3">
            {errors.password && errors.password.message}
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
        </div>
      </form>
    </div>
  );
}
