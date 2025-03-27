import { Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productApi } from "~/apis/ProductApi";
import Header from "~/components/Header/Header";
import { UpArrowIcon } from "~/components/Icons/Icons";
import { formatNumber } from "~/utils/FormatCurrency";

export default function InvestedDetailPage() {
  const {
    user,
    token: { accessToken },
  } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const f = async () => {
      // Call API here
      const res = await productApi.getDetailProductByUser(
        accessToken,
        projectId
      );
      setProduct(res.data);
    };
    f();
  }, [accessToken, projectId]);

  return (
    <div>
      <Header title={"Nhà của yến sào"}></Header>
      <div className="mt-14 pb-12">
        <section>
          <div
            className="pb-2"
            style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <img src={product?.thumbnail} alt="" className="w-full" />
          </div>
        </section>

        <section className="px-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-base font-bold">
              {product?.status === "COMPLETED" ? "Số tiền đã rút" : "Lợi nhuận"}
            </p>
            {product?.status === "COMPLETED" ? (
              <p className="px-2 py-1 rounded bg-[#00FF2F26] flex items-center gap-2 w-fit">
                Hoàn thành
              </p>
            ) : (
              <p className="px-2 py-1 rounded bg-[#00FF2F26] flex items-center gap-2 w-fit">
                <span>
                  <UpArrowIcon />
                </span>
                <span>{Number(product?.annualInterestRate)}%</span>
                <span>/</span>
                <span>Năm</span>
              </p>
            )}
          </div>
          <p className="text-4xl text-[#20696E] mt-4 text-center">
            <span>
              {product?.status === "COMPLETED"
                ? formatNumber(parseFloat(product?.withdrawAmount).toFixed(0))
                : formatNumber(parseFloat(product?.rateAmount).toFixed(0))}
            </span>{" "}
            <span>VNĐ</span>
          </p>

          <div className="mx-auto mt-4 w-1/2 h-[1px] bg-[#C1C1C1]"></div>

          <div className="mt-6">
            <div>
              <p className="font-bold text-base text-black">Số tiền đầu tư</p>
              <p className="mt-5">
                <span>{formatNumber(parseFloat(product?.amount))}</span>{" "}
                <span>VNĐ</span>
              </p>
            </div>
            <div className="mt-5">
              <p className="font-bold text-base text-black">Chu kỳ</p>
              <p className="mt-5">
                <span>{parseFloat(product?.cycleDay)}</span> <span>Ngày</span>
              </p>
            </div>
            <div className="mt-5">
              <p className="font-bold text-base text-black">Thu nhập / Năm</p>
              <p className="mt-4">
                <span>
                  {formatNumber(parseFloat(product?.amountRatePerYear))}
                </span>{" "}
                <span>VNĐ</span>
              </p>
            </div>
            <div className="mt-5">
              <p className="font-bold text-base text-black">
                Thu nhập / Chu kỳ
              </p>
              <p className="mt-4">
                <span>
                  {formatNumber(
                    parseFloat(product?.rateAmountPerCycle).toFixed(0)
                  )}
                </span>{" "}
                <span>VNĐ</span>
              </p>
            </div>
          </div>
        </section>

        {product?.status !== "COMPLETED" && (
          <section
            className="flex items-center justify-between gap-4 mt-5 px-4"
            key={product?.id}
          >
            {/* <PrimaryButton
              onClick={() => {
                navigate(ROUTES.WITHDRAW_INVEST.replace(":type", "RATE"), {
                  state: { product: product },
                });
              }}
            >
              Rút lãi
            </PrimaryButton> */}
            <Button
              className="w-full"
              size="large"
              shape="round"
              onClick={() => {
                navigate(ROUTES.WITHDRAW_INVEST.replace(":type", "RATE"), {
                  state: { product: product },
                });
              }}
              type="primary"
            >
              Rút lãi
            </Button>
            {/* <SecondaryButton
              onClick={() => {
                navigate(ROUTES.WITHDRAW_INVEST.replace(":type", "FULL"), {
                  state: { product: product },
                });
              }}
            >
              Rút gốc + lãi
            </SecondaryButton> */}
            <Button size="large" shape="round" className="w-full">
              Rút gốc + lãi
            </Button>
          </section>
        )}
      </div>
    </div>
  );
}
