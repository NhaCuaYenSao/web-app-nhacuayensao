import { Skeleton, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { categoryApi } from "~/apis/CategoryApi";
import { productApi } from "~/apis/ProductApi";
import CardProduct from "~/components/CardProduct/CardProduct";
import Header from "~/components/Header/Header";
import { ROUTES } from "~/constants/route-constant";

export default function ProductListPage() {
  const {
    token: { accessToken },
  } = useSelector((state) => state.auth);
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingLoadProduct, setLoadingLoadProduct] = useState(false);

  useEffect(() => {
    const fProduct = async () => {
      try {
        const res = await productApi.getProducts(accessToken);
        setProduct(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    const fCategory = async () => {
      try {
        const res = await categoryApi.getCategoryProduct(accessToken);
        const categories = res.data.result;
        setCategories(categories);
      } catch (error) {
        console.log(error);
      }
    };
    const f = async () => {
      await fCategory();
      await fProduct();
    };
    f();
  }, [accessToken]);

  const handleChangeTab = async (categoryId) => {
    setLoadingLoadProduct(true);
    try {
      let res;
      if (categoryId === "all") {
        res = await productApi.getProducts(accessToken);
      } else {
        res = await productApi.getProductByCategory(accessToken, categoryId);
      }
      setProduct(res.data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingLoadProduct(false);
    }
  };

  const renderProducts = (products) => {
    if (loadingLoadProduct) {
      return Array(3)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="mb-4">
            <Skeleton active paragraph={{ rows: 4 }} />
          </div>
        ));
    }
    return products?.map((project) => (
      <Link
        to={ROUTES.PROJECT_DETAIL.replace(":projectId", project.id)}
        key={project.id}
      >
        <CardProduct data={project} />
      </Link>
    ));
  };

  return (
    <div>
      <Header title={"Các dự án đầu tư"}></Header>
      <div className="mt-14">
        <Tabs
          defaultActiveKey="1"
          tabPosition={"top"}
          style={{ height: 220 }}
          onChange={handleChangeTab}
          items={[
            {
              label: "Tất cả",
              key: "all",
              children: <div className="px-4">{renderProducts(product)}</div>,
            },
            ...(Array.isArray(categories)
              ? categories.map((v) => ({
                  label: v.name || "",
                  key: v.id,
                  children: (
                    <div className="px-4">{renderProducts(product)}</div>
                  ),
                }))
              : []),
          ]}
        />
      </div>
    </div>
  );
}
