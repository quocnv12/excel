import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.trangdemo.online/api",
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token;
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  

  // if (result?.error?.originalStatus === 403) {
  //   console.log("Sending refresh token");
  //   // Send the refresh token

  //   const refreshResult = await baseQuery("/refresh", api, extraOptions);

  //   console.log("Refresh Result", refreshResult);

  //   if (refreshResult?.data) {
  //     const user = api.getState().auth.user;
  //     // Store the new token

  //     api.dispatch(
  //       setCredentials({
  //         ...refreshResult.data,
  //         user,
  //       })
  //     );

  //     //   Retry the original query with new token
  //     result = await baseQuery(args, api, extraOptions);
  //   }
  // } else {
  //   api.dispatch(logOut());
  // }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: ['Contract'],
});
