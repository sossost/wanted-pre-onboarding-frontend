/** @jsxImportSource @emotion/react */

import { ReactNode, useEffect } from "react";
import { colors } from "../../constants/color";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../../store/recoilAtoms";

import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const isLoggedin = useRecoilValue(accessTokenState);

  useEffect(() => {
    if (isLoggedin && ["/signup", "/signin"].includes(pathname)) {
      navigate("/todo");
    }
    if (!isLoggedin && ["/todo", "/"].includes(pathname)) {
      navigate("/signin");
    }
  }, [pathname, isLoggedin, navigate]);

  return (
    <div
      css={{
        width: "100%",
        minHeight: "100vh",
        margin: "0 auto",
        padding: "40px 0",
        border: "1px solid #ccc",
        background: `linear-gradient(0, ${colors.primary}, #fc949d)`,
      }}
    >
      <div
        css={{
          position: "relative",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          width: "calc(100% - 40px)",
          maxWidth: "940px",
          height: "100%",
          minHeight: "90vh",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.4)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(5px)",
          borderRadius: "20px",
          padding: "100px 20px 20px 20px",
        }}
      >
        <Header />
        <main
          css={{
            position: "relative",
            display: "flex",
            flexGrow: 1,
            width: "100%",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
