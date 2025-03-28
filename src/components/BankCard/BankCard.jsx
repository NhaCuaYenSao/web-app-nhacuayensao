export default function BankCard({
  bankName = "",
  cardNumber = "",
  accountNumber = "",
  logo = "/images/mastercard.svg",
  onClick = () => {},
}) {
  return (
    <div
      className="rounded-xl p-2 w-full flex items-center gap-3"
      style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)" }}
      onClick={onClick}
    >
      <div className="max-w-[80px] flex items-center justify-center">
        <img src={logo} alt="" className="w-full h-full object-contain" />
      </div>
      <div>
        <p className="text-xs font-bold">{bankName}</p>
        <p className="text-base">
          <span>{cardNumber ? cardNumber : accountNumber}</span>
        </p>
      </div>
    </div>
  );
}
