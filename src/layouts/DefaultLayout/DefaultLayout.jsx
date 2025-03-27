import BottomTabs from "./BottomTabs/BottomTabs";

export default function DefaultLayout({ children, isShowBottomNav = true }) {
  return (
    <div className="max-w-[480px] mx-auto">
      <div className={`${isShowBottomNav ? "mb-[100px]" : "mb-4"} px-2 py-2`}>
        {children}
      </div>
      {isShowBottomNav && <BottomTabs></BottomTabs>}
    </div>
  );
}
