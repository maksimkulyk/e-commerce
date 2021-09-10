import { FC } from "react";
import { Products } from "../components";

interface ShopPageProps {}

const ShopPage: FC<ShopPageProps> = () => {

  // const handleAddToCart = async (productId: string, quantity: number) => {
  //   const { cart } = await commerce.cart.add(productId, quantity);
  //   // setCart(cart);
  // };

  return <Products />;
};

export default ShopPage;
