import { Skeleton } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { noticeApi } from "~/apis/NoticeApi";
import { ROUTES } from "~/constants/route-constant";

export default function NoticePage() {
  const {
    token: { accessToken },
  } = useSelector((state) => state.auth);

  const config = useSelector((state) => state.configSystem);
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const f = async () => {
      const res = await noticeApi.getAllNoticesAPI(accessToken);
      setNotices(res.data);
      setLoading(false);
    };
    f();
  }, [accessToken]);

  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + "...";
  };
  const handleDetailNotice = (noticeId) => {
    navigate(ROUTES.DETAIL_NOTICE.replace(":noticeId", noticeId));
  };

  const NoticeSkeleton = () => (
    <div
      className="flex gap-4 p-2 rounded-xl mb-4"
      style={{ boxShadow: "1px 1px 2px 2px rgba(0, 0, 0, 0.03)" }}
    >
      <Skeleton width={81} height={81} />
      <div className="flex-1">
        <Skeleton width={60} />
        <Skeleton width="80%" style={{ marginTop: "10px" }} />
        <Skeleton width="60%" style={{ marginTop: "8px" }} />
        <Skeleton width={80} style={{ marginTop: "16px" }} />
      </div>
    </div>
  );
  return (
    <div className="">
      {/* <Header title="Thông báo"></Header> */}
      <div>
        <div>
          <p className="font-bold">Thông báo</p>
        </div>
      </div>
      <div className="mt-5">
        {loading ? (
          <>
            <NoticeSkeleton />
            <NoticeSkeleton />
            <NoticeSkeleton />
          </>
        ) : notices?.length === 0 ? (
          <div className="text-center mt-5">
            <p>Bạn không có thông báo nào 😁</p>
          </div>
        ) : (
          notices?.map((v) => (
            <div
              onClick={() => {
                handleDetailNotice(v.id);
              }}
              key={v?.id}
              className="flex items-center gap-4 p-2 rounded-xl"
              style={{ boxShadow: "1px 1px 2px 2px rgba(0, 0, 0, 0.03)" }}
            >
              <div className="w-[81px] h-[81px] bg-[#D9D9D9] flex-shrink-0">
                <img
                  src={config?.logo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div>
                  <h3
                    className={`font-semibold  text-sm text-[rgba(29, 22, 23, 0.80)]`}
                  >
                    {/* {!v?.isRead ? (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm  dark:text-blue-400 border border-blue-400">
                        Chưa đọc
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:text-gray-400 border border-gray-500">
                        Đã xem
                      </span>
                    )} */}
                    <p className="mt-1">{v?.title}</p>
                  </h3>
                  <div className="text-xs mt-2">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: truncateContent(v?.content),
                      }}
                    ></div>
                  </div>
                </div>
                <p className="mt-4 text-xs">
                  {dayjs(v?.createdAt).format("DD/MM/YYYY")}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
