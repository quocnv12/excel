import "./index.css";
import "globalStyles/main.scss";
import variables from "globalStyles/variables.scss";
import { ConfigProvider } from "antd";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import Loader from "components/common/Loader";

const root = ReactDOM.createRoot(document.getElementById("root"));

i18n
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["vi", "en"],
    fallbackLng: `vi`,
    detection: {
      order: [
        "cookie",
        "htmlTag",
        "localStorage",
        "subdomain",
        "querystring",
        "sessionStorage",
        "path",
        "navigator",
      ],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/{{ns}}.json",
    },
  });

const loadingMarkup = <Loader />;

root.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: variables.colorPrimary,
              colorBgContainer: variables.colorBackground,
              colorBorder: variables.colorBorder,
              colorError: variables.colorError,
              colorWarning: variables.colorWarning,
            },
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />}></Route>
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </React.StrictMode>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
