import { apiSlice } from "../../app/api/apiSlice";

export const costControlSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCostControls: builder.query({
      query: () => "cost/index",
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Cost", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetCostControlsQuery } = costControlSlice;
