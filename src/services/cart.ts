import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Cart as ICart } from "@chec/commerce.js/types/cart";
import { productsApi } from "./products";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.chec.io/v1",
    prepareHeaders: (headers) => {
      const publicKey = process.env.REACT_APP_CHEC_PUBLIC_KEY;
      if (publicKey) headers.set("X-Authorization", publicKey);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCart: builder.query<ICart, null>({
      query: () => `/carts`,
    }),
    updateCartItem: builder.mutation({
      query: ({ cartId, itemId, put }) => ({
        url: `https://api.chec.io/v1/carts/${cartId}/items/${itemId}`,
        method: "PUT",
        body: put,
      }),
    }),
  }),
});

export const { useGetCartQuery, useUpdateCartItemMutation } = cartApi;
