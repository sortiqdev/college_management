import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Chat from "../components/Chatbot/chat";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <Chat />
      <Footer />
    </div>
  );
};

export default AppLayout;
