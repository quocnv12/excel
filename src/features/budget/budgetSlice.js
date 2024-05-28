import { apiSlice } from "../../app/api/apiSlice";

export const budgetsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBudgets: builder.query({
      query: () => "budget/index",
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Budget", id: "LIST" }];
      },
    }),

    getBudgetById: builder.query({
      query: (id) => ({
        url: `/budget/edit`,
        method: "GET",
        params: {
          id,
        },
      }),
      transformResponse: (responseData) => {
        return responseData.data;
      },
      providesTags: (result, error, arg) => [{ type: "Budget", id: arg }],
    }),

    addNewBudget: builder.mutation({
      query: (initialProjectData) => ({
        url: "/budget/create",
        method: "POST",
        body: {
          ...initialProjectData,
        },
      }),
      invalidatesTags: [
        {
          type: "Budget",
          id: "LIST",
        },
      ],
    }),
  }),
});

export const {
  useGetBudgetsQuery,
  useGetBudgetByIdQuery,
  useAddNewBudgetMutation,
} = budgetsSlice;
