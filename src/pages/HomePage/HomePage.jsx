import { Carousel, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { configSystemApi } from "~/apis/ConfigSystemApi";
import { productApi } from "~/apis/ProductApi";
import { walletApi } from "~/apis/WalletApi";
import CardProduct from "~/components/CardProduct/CardProduct";
import { ChartIcon, DollarIcon, VoucherIcon } from "~/components/Icons/Icons";
import Wallet from "~/components/Wallet/Wallet";
import { ROUTES } from "~/constants/route-constant";
import { setConfigSystem } from "~/features/SystemConfig/SystemConfigSlide";

export default function HomePage() {
  const {
    user,
    token: { accessToken },
  } = useSelector((state) => state.auth);
  const config = useSelector((state) => state.configSystem);
  const dispatch = useDispatch();
  const [wallet, setWallet] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const f = async () => {
      try {
        setLoading(true);
        const res = await configSystemApi.getConfigSystemAPI(accessToken);
        dispatch(setConfigSystem(res.data));
      } catch (error) {
        setLoading(false);
      }
    };
    f();
  }, [accessToken, dispatch]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await productApi.getProducts(accessToken);
        setProducts(res.data.result);
      } catch (error) {
        console.log(123);
      }
    };
    fetchProjects();
  }, [accessToken]);

  useEffect(() => {
    const f = async () => {
      try {
        const res = await walletApi.getWalletByUserIdAPI(accessToken);
        setWallet(res.data);
      } catch (error) {
        console.log("");
      }
    };
    f();
  }, [accessToken]);

  return (
    <div>
      <section className="flex items-center gap-2">
        <div className="w-12 h-12 overflow-hidden rounded-full">
          {!config?.logo ? (
            <Skeleton avatar active width={40} height={40}></Skeleton>
          ) : (
            <img src={config?.logo} alt="" />
          )}
        </div>
        <div>
          <p className="text-xs">Nhà của Yến sào Xin chào</p>

          <p className="text-base font-medium">
            {accessToken ? (
              user?.fullName ? (
                user?.fullName
              ) : (
                "Bạn chưa xác thực"
              )
            ) : (
              <Link to={ROUTES.LOGIN}>Bạn chưa đăng nhập</Link>
            )}
          </p>
        </div>
      </section>

      {accessToken && (
        <section className="mt-3">
          <h2 className="text-base font-bold mb-4">Ví của tôi</h2>
          <Wallet balance={wallet?.balance} isLoading={!wallet} />
        </section>
      )}

      {products.length > 0 ? (
        <section className="mt-4">
          <h2 className="text-base font-bold mb-4">Đầu tư ngay</h2>
          <Carousel autoplay draggable>
            {products?.map((v) => (
              <Link
                to={ROUTES.PROJECT_DETAIL.replace(":projectId", v?.id)}
                key={v?.id}
              >
                <CardProduct
                  projectName={v?.name}
                  interestRate={v?.annualInterestRate}
                  investCycle={v?.cycleDay}
                  minInvestment={v?.minInvestment}
                  imgThumbnail={v?.thumbnail}
                />
              </Link>
            ))}
          </Carousel>
        </section>
      ) : (
        <section className="mt-4">
          <h2 className="text-base font-bold mb-4">Đầu tư ngay</h2>
          <CardProduct isLoading={true} />
        </section>
      )}

      <section className="mt-4">
        <div className="flex items-start justify-center">
          {accessToken && (
            <Link
              to={ROUTES.INVEST_LIST}
              className="flex flex-col items-center justify-center gap-1 w-1/4"
            >
              <div
                className="w-[36px] h-[36px] flex items-center justify-center rounded"
                style={{ boxShadow: "0px 2px 3.8px 0px rgba(0, 0, 0, 0.17)" }}
              >
                <DollarIcon></DollarIcon>
              </div>
              <p className="text-center">Đầu tư<br/>của tôi</p>
            </Link>
          )}

          {/* <div className="flex flex-col items-center justify-center gap-1 w-1/4">
            <div
              className="w-[36px] h-[36px] flex items-center justify-center rounded"
              style={{ boxShadow: "0px 2px 3.8px 0px rgba(0, 0, 0, 0.17)" }}
            >
              <PenIcon />
            </div>
            <p className="text-center">Bài viết</p>
          </div> */}
          <Link
            to={ROUTES.PROJECT_LIST}
            className="flex flex-col items-center justify-center gap-1 w-1/4"
          >
            <div
              className="w-[36px] h-[36px] flex items-center justify-center rounded"
              style={{ boxShadow: "0px 2px 3.8px 0px rgba(0, 0, 0, 0.17)" }}
            >
              <ChartIcon />
            </div>
            <p className="text-center ">Các dự án<br/>đầu tư</p>
          </Link>
          <Link
            to={ROUTES.VOUCHER_LIST}
            className="flex flex-col items-center justify-center gap-1 w-1/4"
          >
            <div
              className="w-[36px] h-[36px] flex items-center justify-center rounded"
              style={{ boxShadow: "0px 2px 3.8px 0px rgba(0, 0, 0, 0.17)" }}
            >
              <VoucherIcon />
            </div>
            <p className="text-center">Voucher</p>
          </Link>
          <a
            target="_blank"
            href={config?.linkSupport}
            className="flex flex-col items-center justify-center gap-1 w-1/4"
          >
            <div
              className="w-[36px] h-[36px] flex items-center justify-center rounded"
              style={{ boxShadow: "0px 2px 3.8px 0px rgba(0, 0, 0, 0.17)" }}
            >
              <img src="/images/chat-blue.svg" alt="" />
            </div>
            <p className="text-center">CSKH</p>
          </a>
        </div>
      </section>
    </div>
  );
}
