import { zodResolver } from "@hookform/resolvers/zod";
import { Button, message } from "antd";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { authApi } from "~/apis/AuthApi";
import { ArrowLeftIcon } from "~/components/Icons/Icons";
import { ROUTES } from "~/constants/route-constant";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "~/features/Auth/AuthSlide";

const formSchema = z.object({
  email: z.string().email("Email không hợp lệ").trim(),
  password: z.string(),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      dispatch(loginStart());
      const res = await authApi.loginAPI({
        email: data.email,
        password: data.password,
      });
      dispatch(loginSuccess(res.data));
      message.success("Đăng nhập thành công");
      navigate("/", { replace: true });
    } catch (error) {
      if (error.response) {
        dispatch(loginFailure(error.response.data.message));
        showToast({
          message: error.response.data.message || "Đăng nhập thất bại",
          type: "error",
        });
        message.error("Đăng nhập thất bại");
      } else {
        dispatch(loginFailure("Đăng nhập thất bại"));
        message.error("Đăng nhập thất bại!!!");
      }
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
              />
            </div>
            <span className="text-red-500 text-xs font-medium ml-3">
              {errors.email && errors.email.message}
            </span>
          </div>
          <div className="mt-5">
            <label htmlFor="#" className="text-base font-semibold">
              Mật khẩu
            </label>
            <div
              className="rounded-full"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.10)" }}
            >
              <input
                {...register("password")}
                type="password"
                className="outline-none bg-transparent w-[318px] h-[48px] px-4"
              />
            </div>
            <span className="text-red-500 text-xs font-medium ml-3">
              {errors.password && errors.password.message}
            </span>
          </div>
          <div className="mt-12">
            {/* <button className="w-full bg-[#20695E] p-4 text-base text-white rounded-full">
              Đăng nhập
            </button> */}
            <div className="w-full flex justify-center">
              <Button
                htmlType="submit"
                type="primary"
                shape="round"
                size="large"
                className="w-full"
                color="cyan"
                loading={loading}
              >
                Đăng nhập
              </Button>
            </div>
          </div>

          <div className="mt-5 text-center">
            <Link to="/register" className="text-center">
              Đăng ký ngay
            </Link>
          </div>

          <div className="fixed bottom-0 left-0 right-0 text-center mb-5">
            <Link to={ROUTES.FORGOT_PASSWORD} className="text-center">
              Quên mật khẩu
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
