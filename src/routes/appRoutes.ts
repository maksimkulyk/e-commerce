import { AppRoute, Routes } from "../types.dt";
import { CartPage, CheckoutPage, HomePage, ShopPage } from "../pages";

export const appRoutes: AppRoute[] = [
  { path: Routes.HOME_PAGE, exact: true, component: HomePage },
  { path: Routes.SHOP_PAGE, exact: true, component: ShopPage },
  { path: Routes.CART_PAGE, exact: true, component: CartPage },
  { path: Routes.CHECKOUT_PAGE, exact: true, component: CheckoutPage },
];
