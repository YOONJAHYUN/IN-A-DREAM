import React, { useState, useEffect } from "react";
import NavBar from "../components/features/NavbarComponents/Navbar";
import MainPageIntro from "../components/layout/MainPageIntro";
import MainStart from "../components/layout/MainStart";
import MainSecond from "../components/layout/MainSecond";
import MainThird from "../components/layout/MainThird";
import MainFourth from "../components/layout/MainFourth";
import MainFifth from "../components/layout/MainFifth";
import MainSixth from "../components/layout/MainSixth";
import { useMediaQuery } from "react-responsive";
// import useMousePosition from "../hooks/useMousPosition";
// import MouseCursor from "../components/features/MouseCursor/MouseCursor";

import "./styles/MainPage.css";

const MainPage = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [bgColor, setBgColor] = useState("black");

  const isMobileView = useMediaQuery({
    query: "(max-width: 768px)",
  });

  // const { x, y } = useMousePosition();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let currentScrollY = window.scrollY;

      if (currentScrollY >= window.innerHeight * 4.7) {
        setBgColor("black");
      } else if (currentScrollY >= window.innerHeight * 2.5) {
        setBgColor("#E9E4D9");
      } else {
        setBgColor("black");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="MainPage"
      style={{
        backgroundColor: bgColor,
        transition: "background-color 1.5s",
      }}
    >
      {!showIntro && <NavBar />}
      {/* 네브바 옆에 중앙정렬을 위해 마진레프트 네브바 만큼줬씀다 */}
      <div style={{ marginLeft: !showIntro && !isMobileView ? "4rem" : "0" }}>
        {showIntro ? <MainPageIntro /> : <MainStart />}
        <MainSecond />
        <MainThird />
        <MainFourth />
        <MainFifth />
        <MainSixth />
        {/* {!isMobileView && (
          <>
            <div
              className="mouse-cursor"
              style={{
                left: `${x}px`,
                top: `${y}px`,
              }}
            ></div>
            <div
              className="mouse-image"
              style={{
                left: `${x}px`,
                top: `${y}px`,
              }}
            ></div>
          </>
        )} */}
        {/* {!isMobileView && <MouseCursor />} */}
      </div>
    </div>
  );
};

export default MainPage;
