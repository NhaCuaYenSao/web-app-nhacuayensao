import React from "react";
import Header from "~/components/Header/Header";
import { Button } from "antd";

export default function VoucherPage() {
  const handleTakeVoucher = () => {
    // Logic to handle taking the voucher
    console.log("Voucher taken!");
  }

  return (
    <div className="p-4">
      <Header title="Danh sách Voucher"></Header>
      <div className="mt-15">
        <div
          className="box-border p-4 rounded-xl flex items-center justify-center shadow-md mb-4"
        >
          <div className="flex-shrink-0 mr-4 flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10456/10456433.png"
              alt="Voucher"
              className="w-24 h-24"
            />
          </div>
          <div className="flex-1">
            <div className="text-lg mb-1 font-medium">Lorem ipsum</div>
            <div className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleTakeVoucher}>Nhận</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
