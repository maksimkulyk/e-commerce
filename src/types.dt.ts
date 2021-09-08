import React from "react";

export interface SelectOptions {
  id: string;
  label: string;
}

export interface ShippingData {
  [x: string]: any;
}

export interface AppRoute {
  path: string;
  exact: boolean;
  component: React.FunctionComponent;
}

export enum Routes {
  CART_PAGE = "/cart",
  HOME_PAGE = "/",
  SHOP_PAGE = "/shop",
  CHECKOUT_PAGE = "/checkout",
}
