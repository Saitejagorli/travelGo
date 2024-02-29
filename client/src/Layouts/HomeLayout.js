import { Outlet } from "react-router-dom";

import Header from "../components/layout/header/Header";
import Footer from "../components/layout/Footer";

const HomeLayout = () => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
