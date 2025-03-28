import "@ant-design/v5-patch-for-react-19";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import GlobalStyle from "./components/GlobalStyle/GlobalStyle";
import { store } from "./store.js";
import { registerSW } from "virtual:pwa-register";
import { ConfigProvider } from "antd";

if ("serviceWorker" in navigator) {
  registerSW();
}

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <ConfigProvider>
      <GlobalStyle>
        <App />
      </GlobalStyle>
    </ConfigProvider>
  </Provider>
  // </StrictMode>
);
