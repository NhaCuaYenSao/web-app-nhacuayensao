import { Button, Drawer, message } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { investmentApi } from "~/apis/InvestmentApi";
import { productApi } from "~/apis/ProductApi";
import Header from "~/components/Header/Header";
import { ArrowLeftIcon, UpArrowIcon } from "~/components/Icons/Icons";
import { ROUTES } from "~/constants/route-constant";
import { formatCurrency } from "~/utils/FormatCurrency";

export default function ProductDetailPage() {
  const {
    user,
    token: { accessToken },
  } = useSelector((state) => state.auth);
  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState(null);

  const [sheetVisible, setSheetVisible] = useState(false);
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const f = async () => {
      const res = await productApi.getDetailProduct(accessToken, projectId);
      setProduct(res.data);
    };
    f();
  }, [accessToken, projectId]);

  const handleAmountChange = (value) => {
    // Remove all non-digit characters including VNĐ
    const numberOnly = value.replace(/[^\d]/g, "");

    if (numberOnly) {
      const fee = (parseInt(numberOnly) * (0.5 / 100)).toFixed(0);
      const formatted = new Intl.NumberFormat("vi-VN").format(numberOnly);
      setAmount(formatted);
    } else {
      setAmount("");
    }
  };

  const handleInvest = async () => {
    if (!amount) {
      message.error("Vui lòng nhập số tiền đầu tư");
      return;
    }
    const reqAmount = parseInt(amount.replace(/[^\d]/g, ""));
    if (reqAmount < Number(product?.minInvestment)) {
      message.error("Số tiền đầu tư phải lớn hơn mức tối thiểu");
      return;
    }
    try {
      //Call API here
      await investmentApi.invest(accessToken, {
        productId: Number(projectId),
        amount: Number(reqAmount),
        cycleCount: Number(product.cycleDay),
      });

      message.success("Đầu tư thành công");

      navigate(ROUTES.INVEST_SUCCESS_PAGE);
    } catch (error) {
      console.log({ error });
      message.error(error.response.data.message);
      setSheetVisible(false);
      setAmount("");
    }
  };

  return (
    <div>
      <Header title={"Nhà của yến sào"}></Header>
      <div className="mt-14 px-4 pb-[100px]">
        <section className="">
          <div className="relative min-h-[250px]">
            <div>
              <div>
                <p className="text-base font-bold">Lãi xuất</p>
                <p className="flex gap-1 items-center">
                  <span>
                    <UpArrowIcon />
                  </span>
                  <span>{parseFloat(product?.annualInterestRate)}%</span>
                  <span>/</span>
                  <span>Năm</span>
                </p>
              </div>
              <div className="mt-4">
                <p className="text-base font-bold">Chu kỳ</p>
                <p className="flex gap-1 items-center">
                  <span>{product?.cycleDay}</span> <span>Ngày</span>
                </p>
              </div>
              <div className="mt-4">
                <p className="text-base font-bold">Mức đầu tư tối thiểu</p>
                <p className="flex gap-1 items-center">
                  <span>{formatCurrency(Number(product?.minInvestment))}</span>
                  <span>VNĐ</span>
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 -right-4 -z-10 max-w-[271px] overflow-hidden">
              <img src={product?.thumbnail} alt="" />
            </div>
          </div>
        </section>
        <section className="mt-4">
          <p className="text-4xl">
            <span>{formatCurrency(parseFloat(product?.productValue))}</span>{" "}
            <span>VNĐ</span>
          </p>
          <p className="text-gray-500">Quy mô dự án</p>
        </section>

        <section className="mt-4">
          <div className="flex items-center gap-4">
            <div>
              <img src="/images/plan.svg" alt="" />
            </div>
            <div>
              <p className="text-xl font-bold">
                {parseFloat(product?.annualInterestRate)}% mỗi năm
              </p>
              <p className="text-gray-400">Phần trăm lợi nhuận hàng năm</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div>
              <img src="/images/money.svg" alt="" />
            </div>
            <div>
              <p className="text-xl font-bold">
                {formatCurrency(Number(product?.minInvestment))}{" "}
                <span>VNĐ</span>
              </p>
              <p className="text-gray-400">Chi phí đầu tư tối thiểu</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div>
              <img src="/images/calendar.svg" alt="" />
            </div>
            <div>
              <p className="text-xl font-bold">2 Năm</p>
              <p className="text-gray-400">Là thời gian mà bạn nên đầu tư</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div>
              <img src="/images/person.svg" alt="" />
            </div>
            <div>
              <p className="text-xl font-bold">100</p>
              <p className="text-gray-400">Số lượng người đang đầu tư</p>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <p className="text-4xl font-bold">Mô tả dự án</p>
          <div className="text-gray-400">
            <div dangerouslySetInnerHTML={{ __html: product?.content }}></div>
          </div>
        </section>

        <section className="fixed bottom-[60px] left-0 right-0 p-4">
          <Button
            className="w-full"
            size="large"
            shape="round"
            type="primary"
            onClick={() => {
              setSheetVisible(true);
            }}
          >
            Đầu tư ngay
          </Button>
        </section>

        {/* <section>
          <Sheet
            visible={sheetVisible}
            onClose={() => setSheetVisible(false)}
            height={700}
            mask
            handler
            swipeToClose
          >
            {accessToken ? (
              <Box p={4}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div
                      className="p-2 w-10 h-10 rounded-[50%] flex items-center justify-center"
                      style={{
                        boxShadow:
                          "0px 6.297px 16.791px 0px rgba(43, 45, 51, 0.08)",
                      }}
                      onClick={() => {
                        setSheetVisible(false);
                      }}
                    >
                      <ArrowLeftIcon />
                    </div>
                  </div>
                  <p className="text-xl font-bold">Đầu tư ngay</p>
                  <p>📈</p>
                </div>

                <div
                  className="min-h-[300px] rounded-2xl p-6 mx-4 mt-6"
                  style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
                >
                  <p className="text-center text-xl font-bold">
                    <span>Dự án:</span> <span>{product?.name}</span>
                  </p>
                  <div className="mt-4">
                    <div className="flex items-start justify-between">
                      <p className="text-base font-bold text-center w-[30%]">
                        Lãi suất
                      </p>
                      <p className="text-base font-bold text-center w-[30%]">
                        Chu kỳ
                      </p>
                      <p className="text-base font-bold text-center w-[30%]">
                        Mức đầu tư tối thiểu
                      </p>
                    </div>
                    <div className="flex items-start justify-between mt-4">
                      <p className="flex items-center gap-1 text-center w-[30%]">
                        <span>
                          <UpArrowIcon />
                        </span>
                        <span>{Number(product?.annualInterestRate)}%</span>
                        <span>/</span>
                        <span>Năm</span>
                      </p>
                      <p className="text-center w-[30%]">
                        <span>{product?.cycleDay}</span> <span>Ngày</span>
                      </p>
                      <p className="text-center w-[30%]">
                        <span>
                          {formatCurrency(Number(product?.minInvestment))}
                        </span>{" "}
                        <span>VNĐ</span>
                      </p>
                    </div>

                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="0 VNĐ"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        className="font-bold text-[40px] w-full mx-auto block text-center"
                      />
                      {amount && (
                        <span className="text-center w-full block font-bold text-base text-gray-400">
                          VNĐ
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <PrimaryButton
                    onClick={() => {
                      handleInvest();
                    }}
                  >
                    Đầu tư ngay
                  </PrimaryButton>
                </div>
              </Box>
            ) : (
              <Box p={4}>
                <p className="text-center text-xl font-semibold mb-2">
                  Có vẽ như bạn chưa đăng nhập, xin vui lòng đăng nhập để thực
                  hiện thao tác!!!
                </p>
                <p className="text-center">
                  Chúng tôi coi trọng nguồn tài chính của bạn, hãy đăng nhập để
                  sử dụng dịch vụ của chúng tôi!
                </p>
                <div className="mb-4">
                  <img src="/images/invest.svg" alt="" />
                </div>
                <div className="mt-4">
                  <PrimaryButton
                    onClick={() => {
                      navigate(ROUTES.LOGIN);
                      setSheetVisible(false);
                    }}
                  >
                    Đăng nhập
                  </PrimaryButton>
                </div>
              </Box>
            )}
          </Sheet>
        </section> */}

        <section>
          <Drawer
            height={500}
            placement="bottom"
            closable={false}
            onClose={() => {
              setSheetVisible(false);
            }}
            open={sheetVisible}
          >
            {accessToken ? (
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div
                      className="p-2 w-10 h-10 rounded-[50%] flex items-center justify-center"
                      style={{
                        boxShadow:
                          "0px 6.297px 16.791px 0px rgba(43, 45, 51, 0.08)",
                      }}
                      onClick={() => {
                        setSheetVisible(false);
                      }}
                    >
                      <ArrowLeftIcon />
                    </div>
                  </div>
                  <p className="text-xl font-bold">Đầu tư ngay</p>
                  <p>📈</p>
                </div>

                <div
                  className="min-h-[300px] rounded-2xl p-6 mx-4 mt-6"
                  style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
                >
                  <p className="text-center text-xl font-bold">
                    <span>Dự án:</span> <span>{product?.name}</span>
                  </p>
                  <div className="mt-4">
                    <div className="flex items-start justify-between">
                      <p className="text-base font-bold text-center w-[30%]">
                        Lãi suất
                      </p>
                      <p className="text-base font-bold text-center w-[30%]">
                        Chu kỳ
                      </p>
                      <p className="text-base font-bold text-center w-[30%]">
                        Mức đầu tư tối thiểu
                      </p>
                    </div>
                    <div className="flex items-start justify-between mt-4">
                      <p className="flex items-center gap-1 text-center w-[30%]">
                        <span>
                          <UpArrowIcon />
                        </span>
                        <span>{Number(product?.annualInterestRate)}%</span>
                        <span>/</span>
                        <span>Năm</span>
                      </p>
                      <p className="text-center w-[30%]">
                        <span>{product?.cycleDay}</span> <span>Ngày</span>
                      </p>
                      <p className="text-center w-[30%]">
                        <span>
                          {formatCurrency(Number(product?.minInvestment))}
                        </span>{" "}
                        <span>VNĐ</span>
                      </p>
                    </div>

                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="0 VNĐ"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        className="font-bold text-[40px] w-full mx-auto block text-center"
                      />
                      {amount && (
                        <span className="text-center w-full block font-bold text-base text-gray-400">
                          VNĐ
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  {/* <PrimaryButton
                    onClick={() => {
                      handleInvest();
                    }}
                  >
                    Đầu tư ngay
                  </PrimaryButton> */}
                  <Button
                    className="w-full"
                    size="large"
                    shape="round"
                    type="primary"
                    onClick={() => {
                      setSheetVisible(true);
                    }}
                  >
                    Đầu tư ngay
                  </Button>
                </div>
              </div>
            ) : (
              // <Box p={4}>
              //   <p className="text-center text-xl font-semibold mb-2">
              //     Có vẽ như bạn chưa đăng nhập, xin vui lòng đăng nhập để thực
              //     hiện thao tác!!!
              //   </p>
              //   <p className="text-center">
              //     Chúng tôi coi trọng nguồn tài chính của bạn, hãy đăng nhập để
              //     sử dụng dịch vụ của chúng tôi!
              //   </p>
              //   <div className="mb-4">
              //     <img src="/images/invest.svg" alt="" />
              //   </div>
              //   <div className="mt-4">
              //     {/* <PrimaryButton
              //       onClick={() => {
              //         navigate(ROUTES.LOGIN);
              //         setSheetVisible(false);
              //       }}
              //     >
              //       Đăng nhập
              //     </PrimaryButton> */}
              //     <Button
              //       className="w-full"
              //       size="large"
              //       shape="round"
              //       type="primary"
              //       onClick={() => {
              //         setSheetVisible(true);
              //       }}
              //     >
              //       Đăng nhập
              //     </Button>
              //   </div>
              // </Box>
              <div></div>
            )}
          </Drawer>
        </section>
      </div>
    </div>
  );
}
