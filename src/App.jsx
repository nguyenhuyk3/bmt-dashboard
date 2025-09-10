import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import LoginPage from "./pages/login/page";

export default function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <LoginPage />
    </>
  );
}
