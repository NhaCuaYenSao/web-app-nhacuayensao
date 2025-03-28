import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Switch, Button, Upload, message } from "antd";
import { use, useEffect, useState } from "react";
import { uploadApi } from "~/apis/UploadApi";
import Header from "~/components/Header/Header";

const extractFileName = (url) => {
  if (!url) return "";
  const parts = url.split("/");
  const lastPart = parts[parts.length - 1];
  return lastPart.split("?")[0];
};

export default function KycPage() {
  const [form] = Form.useForm();
  const [loadingUpload, setLoadingUpload] = useState(false);

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div>
      <Header title="Thông tin KYC"></Header>
      <div className="mt-14">
        <div className="box-border p-4 rounded-lg shadow-md mb-4">
          <div>
            <h2 className="font-medium text-lg my-2">Thông tin cá nhân</h2>
            <div>
              <Form
                form={form}
                layout="vertical"
                className="space-y-4"
                onFinish={handleSubmit}
              >
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                >
                  <Input placeholder="Nhập họ và tên" />
                </Form.Item>
                <Form.Item label="Giới tính" name="gender">
                  <Switch checkedChildren="Nữ" unCheckedChildren="Nam" />
                </Form.Item>
                <Form.Item
                  label="Ngày sinh"
                  name="birthDate"
                  rules={[
                    { required: true, message: "Vui lòng nhập ngày sinh" },
                  ]}
                >
                  <Input placeholder="Nhập ngày sinh" />
                </Form.Item>
                <Form.Item
                  label="Số CCCD/CMND/Hộ chiếu"
                  name="identityNumber"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số CCCD/CMND/Hộ chiếu",
                    },
                  ]}
                >
                  <Input placeholder="Nhập số CCCD/CMND/Hộ chiếu" />
                </Form.Item>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                >
                  <Input placeholder="Nhập địa chỉ" />
                </Form.Item>
                <Form.Item>
                  <h2 className="font-medium text-lg">
                    Tải giấy tờ xác minh của bạn
                  </h2>
                  <div>
                    <p className="text-sm mb-3">
                      Vui lòng tải lên giấy tờ xác minh của bạn (Mặt trước và
                      mặt sau CCCD/CMND/Hộ chiếu, 1 hình có mặt bạn).
                    </p>
                    <Form.Item
                      name="thumbnails"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng tải lên giấy tờ xác minh",
                        },
                      ]}
                    >
                      <Upload
                        listType="picture"
                        maxCount={3}
                      >
                        <Button type="primary" icon={<UploadOutlined />}>
                          Upload
                        </Button>
                      </Upload>
                    </Form.Item>
                  </div>
                </Form.Item>
                <div className="flex justify-end mt-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loadingUpload}
                  >
                    Gửi yêu cầu xác minh
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
