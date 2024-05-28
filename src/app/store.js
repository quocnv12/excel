import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import projectsReducer from "../features/project/projectSlice";

import { apiSlice } from "./api/apiSlice";
import { budgetsSlice } from "features/budget/budgetSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    projects: projectsReducer,
    auth: authReducer,
    budgets: budgetsSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true,
});
