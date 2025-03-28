import { Button, Drawer, message } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bankApi } from "~/apis/BankApi";
import { walletApi } from "~/apis/WalletApi";
import BankCard from "~/components/BankCard/BankCard";
import Header from "~/components/Header/Header";
import { ArrowLeftIcon } from "~/components/Icons/Icons";
import { ROUTES } from "~/constants/route-constant";
import { formatCurrency } from "~/utils/FormatCurrency";

export default function WithdrawPage() {
  const {
    user,
    token: { accessToken },
  } = useSelector((state) => state.auth);
  const [bankCards, setBankCards] = useState(null);
  const [bankCard, setBankCard] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [wallet, setWallet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.kycStatus !== "APPROVED") {
      navigate(ROUTES.KYC_INFO);
      message.error(
        "Vui lòng cập nhật thông tin cá nhân trước khi thực hiện giao dịch"
      );
    }
  }, [navigate, user]);

  // Lấy thông tin ví
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await walletApi.getWalletByUserIdAPI(accessToken);
        setWallet(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWallet();
  }, [accessToken]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await bankApi.getAllBanksByUser(accessToken);
        setBankCards(res.data);
        setBankCard(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [accessToken]);

  const handleChoiceBankCard = () => {
    const remainingCards = bankCards?.filter(
      (item) => item.id !== bankCard?.id
    );
    if (remainingCards && remainingCards.length > 0) {
      setSheetVisible(true);
    }
  };

  const handleContinueWithdraw = () => {
    navigate(ROUTES.CONFIRM_WITHDRAW.replaceAll(":bankId", bankCard?.id));
  };

  return (
    <div>
      <Header title="Rút tiền tài khoản"></Header>
      <div className="">
        <section className="mt-14">
          <h2 className="text-base font-bold mb-3">Rút tiền từ</h2>
          <div
            className="rounded-xl p-2 w-full flex items-center gap-3"
            style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
          >
            <div
              className="p-2 rounded-[50%] w-10 h-10 overflow-hidden flex items-center justify-center"
              style={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <img src="/images/wallet.svg" alt="" />
            </div>
            <div>
              <p className="text-xs font-bold">Ví của tôi</p>
              <p className="text-base">
                <span>{formatCurrency(Number(wallet?.balance))}</span>{" "}
                <span>VNĐ</span>
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-base font-bold mb-3">Đến</h2>
          {bankCard ? (
            <BankCard
              logo={bankCard?.logo}
              cardNumber={bankCard?.cardNumber}
              accountNumber={bankCard?.accountNumber}
              bankName={bankCard?.name}
              onClick={() => {
                handleChoiceBankCard();
              }}
            />
          ) : (
            <Link to={ROUTES.CHOICE_CARD_BANK}>
              <BankCard
                cardNumber={"---- ---- ---- ----"}
                bankName={"Bạn chưa có thể ngân hàng! Thêm ngay"}
              />
            </Link>
          )}
        </section>

        <section className="fixed bottom-2 left-0 right-0 p-4">
          <Button
            className="w-full"
            size="large"
            shape="round"
            type="primary"
            onClick={handleContinueWithdraw}
          >
            Tiếp tục
          </Button>
        </section>

        <section>
          <Drawer
            open={sheetVisible}
            onClose={() => setSheetVisible(false)}
            height={500}
            placement="bottom"
            closable={false}
          >
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
                <p className="text-xl font-bold">Danh sách thẻ</p>
                <p>🎫</p>
              </div>

              <div className="mt-4">
                {bankCards
                  ?.filter((item) => item.id !== bankCard?.id)
                  .map((item) => (
                    <div key={item.id} className="mt-4">
                      <BankCard
                        logo={item.logo}
                        cardNumber={item.cardNumber}
                        accountNumber={item.accountNumber}
                        bankName={item.name}
                        onClick={() => {
                          setBankCard(item);
                          setSheetVisible(false);
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </Drawer>
        </section>
      </div>
    </div>
  );
}
