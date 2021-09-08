import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.chec.io/v1",
    prepareHeaders: (headers) => {
      const publicKey = process.env.REACT_APP_CHEC_PUBLIC_KEY;
      if (publicKey) headers.set("X-Authorization", publicKey);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
