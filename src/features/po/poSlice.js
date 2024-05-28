import { apiSlice } from "../../app/api/apiSlice";

export const poSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPOs: builder.query({
      query: () => "purchase-order/index",
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: (result, error, arg) => {
        return [{ type: "PO", id: "LIST" }];
      },
    }),

    getPoById: builder.query({
      query: (id) => ({
        url: `/purchase-order/edit`,
        method: "GET",
        params: {
          id,
        },
      }),
      transformResponse: (responseData) => {
        return responseData.data;
      },
      providesTags: (result, error, arg) => [{ type: "Po", id: arg }],
    }),

    addNewPo: builder.mutation({
      query: (credential) => ({
        url: "/purchase-order/create",
        method: "POST",
        body: {...credential,
        },
      }),
      invalidatesTags: [
        {
          type: "PO",
          id: "LIST",
        },
      ],
      providesTags: (result, error, arg) => [{ type: "Po", id: arg }],
    }),

    updatePo: builder.mutation({
      query: (initialPoData) => ({
        url: "/purchase-order/update",
        method: "POST",
        body: {
          ...initialPoData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        {
          type: "po",
          id: arg.id,
        },
        {
          type: "po",
          id: "LIST",
        },
      ],
    }),

  }),
});

export const { 
  useGetPOsQuery, 
  useGetPoByIdQuery, 
  useAddNewPoMutation,
  useUpdatePoMutation 
} = poSlice;
