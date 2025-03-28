import { zodResolver } from "@hookform/resolvers/zod";
import { Button, message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { authApi } from "~/apis/AuthApi";
import { ArrowLeftIcon } from "~/components/Icons/Icons";
import { ROUTES } from "~/constants/route-constant";

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email là bắt buộc")
      .email("Email không hợp lệ")
      .trim(),
    phoneNumber: z
      .string()
      .min(1, "Số điện thoại là bắt buộc")
      .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
      .min(10, "Số điện thoại phải có ít nhất 10 số")
      .max(11, "Số điện thoại không được quá 11 số"),
    password: z
      .string()
      .min(1, "Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
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
      password: "",
      phoneNumber: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authApi.registerAPI({
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      });
      message.success("Đăng ký thành công");
      navigate(ROUTES.SUCCESS_PAGE, {
        state: {
          mgs: "Đăng ký thành công",
        },
      });
    } catch (error) {
      message.error(error.response.data.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
                placeholder="VD: abc@gmail.com"
              />
            </div>
            <span className="text-red-500 text-xs font-medium ml-3">
              {errors.email && errors.email.message}
            </span>
          </div>
          <div>
            <label htmlFor="#" className="text-base font-semibold">
              Số điện thoại
            </label>
            <div
              className="rounded-full"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.10)" }}
            >
              <input
                type="email"
                {...register("phoneNumber")}
                placeholder="VD: 098123456"
                className="outline-none bg-transparent w-[318px] h-[48px] px-4"
              />
            </div>
            <span className="text-red-500 text-xs font-medium ml-3">
              {errors.phoneNumber && errors.phoneNumber.message}
            </span>
          </div>
          <div>
            <label htmlFor="#" className="text-base font-semibold">
              Mật khẩu
            </label>
            <div
              className="rounded-full"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.10)" }}
            >
              <input
                {...register("password")}
                placeholder="Nhập mật khẩu của bạn"
                type="password"
                className="outline-none bg-transparent w-[318px] h-[48px] px-4"
              />
            </div>
            <span className="text-red-500 text-xs font-medium ml-3">
              {errors.password && errors.password.message}
            </span>
          </div>
          <div>
            <label htmlFor="#" className="text-base font-semibold">
              Nhập lại mật khẩu
            </label>
            <div
              className="rounded-full"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.10)" }}
            >
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Nhập lại mật khẩu của bạn"
                className="outline-none bg-transparent w-[318px] h-[48px] px-4"
              />
            </div>
            <span className="text-red-500 text-xs font-medium ml-3">
              {errors.confirmPassword && errors.confirmPassword.message}
            </span>
          </div>
          <div className="mt-4">
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
              Đăng ký
            </button> */}
          </div>

          <div className="mt-5 text-center">
            <Link to={ROUTES.LOGIN} className="text-center">
              Bạn đã có tài khoản? Đăng nhập ngay
            </Link>
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
    </div>
  );
}
