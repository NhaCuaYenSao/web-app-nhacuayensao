import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OTPAPI } from "~/apis/OTPAPI";
import Header from "~/components/Header/Header";
import { ROUTES } from "~/constants/route-constant";

export default function ChangePasswordPage() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await OTPAPI.sendOtp({ email: user?.email });
      navigate(ROUTES.OTP.replace(":type", "CHANGE_PASSWORD"), {
        state: {
          email: user?.email,
          newPassword: data.newPassword,
          oldPassword: data.oldPassword,
        },
      });
    } catch {
      message.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  return (
    <div>
      <Header title="Thay đổi mật khẩu"></Header>
      <div className="mt-14">
        <section>
          <Form onFinish={onSubmit} noValidate>
            <Form.Item
              label="Nhập mật khẩu hiện tại của bạn"
              name="oldPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
              ]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu hiện tại của bạn"
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
              ]}
            >
              <Input.Password placeholder="Mật khẩu mới của bạn" size="large" />
            </Form.Item>
            <Form.Item
              label="Nhập lại mật khẩu mới"
              name="confirmNewPassword"
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu mới" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu nhập lại không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Nhập lại mật khẩu mới"
                size="large"
              />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                className="w-full"
                shape="round"
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
              >
                Tiếp tục
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    </div>
  );
}
