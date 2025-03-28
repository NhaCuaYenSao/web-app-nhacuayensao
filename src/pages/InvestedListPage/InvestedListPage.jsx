import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productApi } from "~/apis/ProductApi";
import CardProduct from "~/components/CardProduct/CardProduct";
import Header from "~/components/Header/Header";
import { ROUTES } from "~/constants/route-constant";

export default function InvestedListPage() {
  const {
    token: { accessToken },
  } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const f = async () => {
      const res = await productApi.getProductByUser(accessToken);
      setProducts(res.data.result);
      console.log(res.data.result);
    };
    f();
  }, [accessToken]);

  return (
    <div>
      <Header title="Dự án đã đầu tư" />
      <div className="mt-14">
        <div className="flex flex-col gap-4">
          {!products.length ? (
            <>
              <CardProduct isLoading></CardProduct>
              <CardProduct isLoading></CardProduct>
            </>
          ) : (
            products?.map((v) => (
              <Link
                key={v?.id}
                to={`${ROUTES.DETAIL_INVEST.replace(":projectId", v?.id)}`}
              >
                <CardProduct
                  projectName={v?.name}
                  imgThumbnail={v?.thumbnail}
                  interestRate={v?.annualInterestRate}
                  investCycle={v?.cycleDay}
                  minInvestment={v?.minInvestment}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
