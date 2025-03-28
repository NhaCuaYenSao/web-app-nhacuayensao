import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bankApi } from "~/apis/BankApi";
import { vietQrApi } from "~/apis/VietQRApi";
import Header from "~/components/Header/Header";
import { ROUTES } from "~/constants/route-constant";

export default function AddCardPage() {
  const {
    token: { accessToken },
  } = useSelector((state) => state.auth);
  const { type } = useParams();
  const [bank, setBank] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    const f = async () => {
      const res = await vietQrApi.getAllBanks();
      const banks = res.data;
      const bank = banks.find((v) => v.code === type);
      setBank(bank);
    };
    f();
  }, [type]);

  const onSubmit = async (data) => {
    try {
      await bankApi.createBank(accessToken, data);
      navigation(ROUTES.SUCCESS_PAGE, {
        state: {
          msg: "Thêm thẻ ngân hàng thành công",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header title="Thêm thẻ ngân hàng"></Header>
      {bank && (
        <div className="mt-14">
          <img src={bank?.logo} style={{ width: "100%" }} alt="" />
          <Form
            onFinish={onSubmit}
            autoComplete="off"
            noValidate
            initialValues={{
              logo: bank?.logo,
              name: `${bank?.name} - ${bank?.code}`,
            }}
          >
            <Form.Item name="logo">
              <Input hidden value={bank?.logo} />
            </Form.Item>
            <Form.Item
              label="Tên ngân hàng"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên ngân hàng" },
              ]}
            >
              <Input placeholder="Tên ngân hàng" size="large" disabled />
            </Form.Item>
            <Form.Item
              label="Số tài khoản"
              name="accountNumber"
              rules={[
                { required: true, message: "Vui lòng nhập số tài khoản" },
              ]}
            >
              <Input placeholder="Nhập số tài khoản" size="large" />
            </Form.Item>
            <Form.Item
              label="Tên người thụ hưởng"
              name="accountName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên người thụ hưởng",
                },
              ]}
            >
              <Input placeholder="Nhập tên người thụ hưởng" size="large" />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                shape="round"
                size="large"
                type="primary"
                htmlType="submit"
                className="w-full"
              >
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}
