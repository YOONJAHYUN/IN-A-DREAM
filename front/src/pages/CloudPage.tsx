import { useState, useEffect } from "react";
import clImage from "../assets/background/CLcloud.jpg";
import Cloud from "../components/features/CloudComponents/Cloud";
import { useAllDiary } from "../hooks/useAllDiary";
import { DiaryInfo } from "../types/ApiType";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../constants";

interface CloudProps {
  children?: React.ReactNode;
}

function Overlay({ children }: CloudProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${clImage})`,
        backgroundRepeat: "repeat",
        backgroundSize: "50vw 75vh",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "200vw",
        height: "150vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}

function CloudPage() {
  const [diaries, setDiaries] = useState<DiaryInfo[]>([]);
  const { sortKey } = useParams<string>();
  const validSortKey = sortKey || "";

  const {
    data: response,
    isLoading,
    error,
  } = useAllDiary({ page: 0, size: 8, sort: ["likeCount", validSortKey] });

  useEffect(() => {
    // 페이지가 로드되면 뷰포트 중앙으로 스크롤
    const centerOfWidth =
      document.documentElement.scrollWidth / 2 - window.innerWidth / 2;
    const centerOfHeight =
      document.documentElement.scrollHeight / 2 - window.innerHeight / 2;
    window.scrollTo(centerOfWidth, centerOfHeight);
  }, []);

  useEffect(() => {
    if (response && response.data && response.data.data) {
      // console.log(response);
      // console.log(response.data.data);
      setDiaries(response.data.data);
    }
  }, [response]);

  return (
    <>
      <Overlay>
        <Cloud />
      </Overlay>
    </>
  );
}

export default CloudPage;
