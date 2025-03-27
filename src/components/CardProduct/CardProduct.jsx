import { formatCurrency } from "~/utils/FormatCurrency";
import { UpArrowIcon } from "../Icons/Icons";
import { Skeleton } from "antd";

export default function CardProduct({
  projectName = "",
  interestRate = 0,
  investCycle = 0,
  minInvestment = 0,
  imgThumbnail = "/images/bg.png",
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <div className="block rounded-2xl px-4 py-3 relative overflow-hidden min-h-[255px]">
        <Skeleton width={200} height={30}></Skeleton>
      </div>
    );
  }

  return (
    <div
      className="block rounded-2xl px-5 py-3 relative overflow-hidden min-h-[255px] text-black"
      style={{ boxShadow: "0px 1px 4.3px 0px rgba(0, 0, 0, 0.15)" }}
    >
      <div>
        <h2 className="text-base font-bold ">
          <span>Dự án: </span> <span> {projectName}</span>
        </h2>
        <div className="mt-5 flex flex-col gap-6">
          <div className="">
            <p className="mb-2 font-bold">Lãi xuất</p>
            <p className="flex items-center gap-1 text-xs">
              <UpArrowIcon></UpArrowIcon>
              <span>{Number(interestRate)}%</span>
              <span>/</span>
              <span>Năm</span>
            </p>
          </div>
          <div className="">
            <p className="mb-2 font-bold">Chu kỳ</p>
            <p className="flex items-center gap-1 text-xs">
              <span>{investCycle} Ngày</span>
            </p>
          </div>
          <div className="">
            <p className="mb-2 font-bold">Mức đầu tư tối thiểu</p>
            <p className="flex items-center gap-1 text-xs">
              <span>{formatCurrency(Number(minInvestment))} VNĐ</span>
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 -z-10 max-w-[271px] overflow-hidden">
        <img src={imgThumbnail} alt="" className="w-full h-full object-cover" />
      </div>

      <p className="flex gap-1 items-center p-1 bg-[#00FF2F26] w-fit rounded text-xs text-[#20695E] absolute top-3 right-3">
        <UpArrowIcon></UpArrowIcon>
        <span>{Number(interestRate)}%</span>
        <span>/</span>
        <span>Năm</span>
      </p>
    </div>
  );
}
