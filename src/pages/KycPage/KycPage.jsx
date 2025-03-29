import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, message, Switch, Upload } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { authApi } from "~/apis/AuthApi";
import Header from "~/components/Header/Header";

export default function KycPage() {
  const {
    user: { phoneNumber },
    token: { accessToken },
  } = useSelector((state) => state.auth);

  const [form] = Form.useForm();
  const [loadingUpload, setLoadingUpload] = useState(false);

  const handleSubmit = async (values) => {
    // const thumbnails = values.thumbnails.map((file) => file.response.data.url);
    // console.log(thumbnails);
    const frontIdentityCard = values.frontIdentityCard[0].response.data.url;
    const backIdentityCard = values.backIdentityCard[0].response.data.url;
    const selfieIdentityCard = values.selfieIdentityCard[0].response.data.url;
    const gender = values.gender ? false : true;
    const birthDate = dayjs(values.birthDate).format("DD/MM/YYYY");
    const data = {
      ...values,
      frontIdentityCard,
      backIdentityCard,
      selfieIdentityCard,
      gender,
      birthDate,
      phoneNumber,
    };

    // console.log(data);
    setLoadingUpload(true);
    try {
      await authApi.saveKycApi(accessToken, data);
      message.success("Gửi yêu cầu xác minh thành công!");
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      setLoadingUpload(false);
    }
    // console.log(values);
  };

  const validateFile = (_, fileList = []) => {
    if (fileList.length === 0) {
      return Promise.reject("Vui lòng tải lên ít nhất một tệp");
    }
    // if (fileList.length < 3 || fileList.length > 3) {
    //   return Promise.reject("Vui lòng tải lên 3 tệp theo yêu cầu!!!");
    // }
    const file = fileList[0];
    const isImage = file.type === "image/jpeg" || file.type === "image/png";
    if (!isImage) {
      return Promise.reject("Chỉ chấp nhận tệp ảnh (JPEG/PNG)");
    }
    return Promise.resolve();
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
                  <Switch checkedChildren="Nam" unCheckedChildren="Nữ" />
                </Form.Item>
                <Form.Item
                  label="Ngày sinh"
                  name="birthDate"
                  rules={[
                    { required: true, message: "Vui lòng nhập ngày sinh" },
                  ]}
                >
                  {/* <Input placeholder="Nhập ngày sinh" /> */}
                  <DatePicker className="w-full" format="DD/MM/YYYY" />
                </Form.Item>
                <Form.Item
                  label="Quốc tịch"
                  name="nationality"
                  rules={[
                    { required: true, message: "Vui lòng nhập quốc tịch" },
                  ]}
                >
                  <Input placeholder="Nhập quốc tịch của bạn" />
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
                    <p className="text-sm mb-3">CCCD mặt trước</p>
                    <Form.Item
                      name="frontIdentityCard"
                      valuePropName="fileList"
                      getValueFromEvent={({ fileList }) => fileList}
                      rules={[{ validator: validateFile }]}
                    >
                      <Upload
                        name="file"
                        action="http://localhost:3001/api/v1/cloud/upload"
                        listType="picture"
                        maxCount={1}
                      >
                        <Button icon={<UploadOutlined />}>Tải lên</Button>
                      </Upload>
                    </Form.Item>
                  </div>
                </Form.Item>
                <Form.Item>
                  <div>
                    <p className="text-sm mb-3">CCCD mặt sau</p>
                    <Form.Item
                      name="backIdentityCard"
                      valuePropName="fileList"
                      getValueFromEvent={({ fileList }) => fileList}
                      rules={[{ validator: validateFile }]}
                    >
                      <Upload
                        name="file"
                        action="http://localhost:3001/api/v1/cloud/upload"
                        listType="picture"
                        maxCount={1}
                      >
                        <Button icon={<UploadOutlined />}>Tải lên</Button>
                      </Upload>
                    </Form.Item>
                  </div>
                </Form.Item>
                <Form.Item>
                  <div>
                    <p className="text-sm mb-3">Ảnh mặt của bạn</p>
                    <Form.Item
                      name="selfieIdentityCard"
                      valuePropName="fileList"
                      getValueFromEvent={({ fileList }) => fileList}
                      rules={[{ validator: validateFile }]}
                    >
                      <Upload
                        name="file"
                        action="http://localhost:3001/api/v1/cloud/upload"
                        listType="picture"
                        maxCount={1}
                      >
                        <Button icon={<UploadOutlined />}>Tải lên</Button>
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
