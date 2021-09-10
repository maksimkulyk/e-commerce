import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Product as IProduct } from "@chec/commerce.js/types/product";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.chec.io/v1",
    prepareHeaders: (headers) => {
      const publicKey = process.env.REACT_APP_CHEC_PUBLIC_KEY;
      if (publicKey) headers.set("X-Authorization", publicKey);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => "/products",
      transformResponse: (response: { data: IProduct[] }) => response.data,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
