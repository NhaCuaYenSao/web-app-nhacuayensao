import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { vietQrApi } from "~/apis/VietQRApi";
import BankCard from "~/components/BankCard/BankCard";
import Header from "~/components/Header/Header";
import { ROUTES } from "~/constants/route-constant";

export default function ChoiceCardBankPage() {
  const [banks, setBanks] = useState([]);
  useEffect(() => {
    const f = async () => {
      const res = await vietQrApi.getAllBanks();
      setBanks(res.data);
    };
    f();
  }, []);
  return (
    <div>
      <Header title="Thêm thẻ ngân hàng"></Header>
      <div className="mt-14">
        <section className="flex flex-col items-center justify-center gap-4">
          {banks?.map((v) => (
            <Link
              to={ROUTES.ADD_CARD.replace(":type", v?.code)}
              className="w-full"
            >
              <BankCard
                logo={v?.logo}
                bankName={v?.name}
                // cardNumber={v?.shortName}
              />
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
