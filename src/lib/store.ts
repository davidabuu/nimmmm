import { configureStore } from "@reduxjs/toolkit";
import loginUser from "../redux/auth/login";
import fetchAccountInfo from "../redux/auth/fetchAccountInfo";
import getHistoryPayments from "../redux/payment/historyPayment";
import getOutstandingPayments from "../redux/payment/outstandingPayment";
import fetchGradeCriteria from "../redux/grade/gradeCriteria";
import changePassword from "../redux/auth/changePassword";
import getPublication from "../redux/publications/getPublication";
import getNews from "../redux/news/getPublication";
import getEvents from "../redux/events/getEvents";
import getSingleEvent from "../redux/events/getSingleEvent";
import validateMember from "../redux/auth/memberValidation";
import signUpUser from "../redux/auth/signUp";
import  fetchProfile  from "../redux/auth/profile";
import  initializePayment  from "../redux/payment/initializePayment";
import requestOTP  from "../redux/auth/requestOtp";

export const makeStore = () => {
  return configureStore({
    reducer: {
      loginUser,
      fetchAccountInfo,
      getHistoryPayments,
      validateMember,
      getNews,
      getSingleEvent,
      initializePayment,
      getEvents,
      changePassword,
      signUpUser,
      requestOTP,
      fetchProfile,
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
