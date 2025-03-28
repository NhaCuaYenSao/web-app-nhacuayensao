import React, { useEffect, useState } from "react";
import Header from "~/components/Header/Header";
import { Button, message } from "antd";
import { voucherApi } from "~/apis/VoucherApi";

export default function MyVoucherPage () {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVouchers = async () => {
    try {
      const { data } = await voucherApi.getAllVouchersAPI();

      setVouchers(data);
    } catch (error) {
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
        {vouchers.length > 0 ? (
          vouchers.map((voucher) => (
            <div
              key={voucher.id}
              className="box-border p-4 rounded-xl flex items-center justify-center shadow-md mb-4"
            >
              <div className="flex-shrink-0 mr-4 flex items-center">
                <img
                  src={voucher.thumbnail}
                  alt="Voucher"
                  className="w-24 h-24"
                />
              </div>
              <div className="flex-1">
                <div className="text-lg mb-1 font-medium">{voucher.title}</div>
                <div className="text-sm">{voucher.description}</div>
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
