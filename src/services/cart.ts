import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Cart as ICart } from "@chec/commerce.js/types/cart";

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
    getCart: builder.query<ICart, void>({
      query: () => `/carts`,
    }),
    updateCartItem: builder.mutation({
      query: ({ cartId, itemId, options }) => ({
        url: `/carts/${cartId}/items/${itemId}`,
        method: "PUT",
        body: options,
      }),
    }),
    addItemToCart: builder.mutation({
      query: ({ cartId, itemId, quantity }) => ({
        url: `/carts/${cartId}`,
        method: "POST",
        body: { id: itemId, quantity: quantity },
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useAddItemToCartMutation,
} = cartApi;
