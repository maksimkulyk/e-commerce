import { FC, useEffect, useState } from "react";
import { Cart } from "../components";
import { commerce } from "../lib/commerce";
import { Cart as ICart } from "@chec/commerce.js/types/cart";

interface CartPageProps {}

const CartPage: FC<CartPageProps> = () => {
  const [cart, setCart] = useState<ICart>({} as ICart);
  console.log(cart);

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    if (cart) setCart(cart);
  };

  const handleUpdateCartQuantity = async (
    productId: string,
    quantity: number
  ) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const handleRemoveFromCart = async (productId: string) => {
    const { cart } = await commerce.cart.remove(productId);
    cart && setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Cart
      cart={cart}
      handleUpdateCartQuantity={handleUpdateCartQuantity}
      handleRemoveFromCart={handleRemoveFromCart}
      handleEmptyCart={handleEmptyCart}
    />
  );
};

export default CartPage;
