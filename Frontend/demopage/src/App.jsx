import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Chat from "./components/Chatbot/chat";
import "./App.css";

const App = () => {
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

export default App;
