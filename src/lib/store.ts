import { configureStore } from "@reduxjs/toolkit";
import loginUser from "../redux/auth/login";
import fetchAccountInfo from "../redux/auth/fetchAccountInfo";
import getHistoryPayments from "../redux/payment/historyPayment";
import getOutstandingPayments from "../redux/payment/outstandingPayment";
import fetchGradeCriteria from "../redux/grade/gradeCriteria";
import changePassword from "../redux/auth/changePassword";
import getPublication from "../redux/publications/getPublication";
import getNews from "../redux/news/getPublication";

export const makeStore = () => {
  return configureStore({
    reducer: {
      loginUser,
      fetchAccountInfo,
      getHistoryPayments,
      getNews,
      changePassword,
      getPublication,
      getOutstandingPayments,
      fetchGradeCriteria,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
