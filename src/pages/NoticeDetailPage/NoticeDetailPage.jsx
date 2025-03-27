import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { noticeApi } from "~/apis/NoticeApi";
import Header from "~/components/Header/Header";

export default function NoticeDetailPage() {
  const {
    token: { accessToken },
  } = useSelector((state) => state.auth);
  const { noticeId } = useParams();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const f = async () => {
      const res = await noticeApi.getNoticeDetailAPI(accessToken, noticeId);
      console.log(res);
      setNotice(res.data);
    };
    f();
  }, [accessToken, noticeId]);

  return (
    <div>
      <Header title={notice?.title || "Chi tiết thông báo"}></Header>
      <div className="mt-4">
        <section className="px-4">
          <p className="text-xl font-bold">{notice?.title}</p>
          <p className="font-bold mb-8 text-gray-500 text-xs">
            Thông báo lúc: {dayjs(notice?.createdAt).format("DD/MM/YYYY HH:mm")}
          </p>
          <div dangerouslySetInnerHTML={{ __html: notice?.content }}></div>
        </section>
      </div>
    </div>
  );
}
