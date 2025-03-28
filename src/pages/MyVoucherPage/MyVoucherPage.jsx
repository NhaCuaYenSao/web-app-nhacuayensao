import React, { useEffect, useState } from "react";
import Header from "~/components/Header/Header";
import { message } from "antd";
import { voucherApi } from "~/apis/VoucherApi";

export default function MyVoucherPage () {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVouchers = async () => {
    try {
      const { data } = await voucherApi.getVoucherByUserAPI();

      setData(data);
    } catch (error) {
      message.error("Có lỗi xảy ra khi tải danh sách voucher!");
      console.error("Error fetching vouchers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  return (
    <div className="p-4">
      <Header title="Danh sách Voucher của Tôi"></Header>
      <div className="mt-14">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.voucher.id}
              className="box-border p-4 rounded-xl flex justify-center shadow-md mb-4"
            >
              <div className="flex-shrink-0 mr-4 flex items-center">
                <img
                  src={item.voucher.thumbnail}
                  alt="Voucher"
                  className="w-24 h-24"
                />
              </div>
              <div className="flex-1">
                <div className="text-lg mb-1 font-medium">{item.voucher.title}</div>
                <div className="text-sm">{item.voucher.description}</div>
              </div>
            </div>
          ))
        ) : loading ? (
          <div className="text-center mt-5">Đang tải...</div>
        ) : (
          <div className="text-center mt-5">Hiện tại không có voucher</div>
        )}
      </div>
    </div>
  );
}
