import { FC, useEffect, useState } from "react";
import { Products } from "../components";
import { commerce } from "../lib/commerce";
import { Product } from "@chec/commerce.js/types/product";
import { useGetProductsQuery } from "../services/products";

interface ShopPageProps {}

const ShopPage: FC<ShopPageProps> = () => {
  const { data, error, isLoading } = useGetProductsQuery(null);

  // const [products, setProducts] = useState<Product[]>([]);

  // const fetchProducts = async () => {
  //   const { data } = await commerce.products.list();
  //   setProducts(data);
  // };

  const handleAddToCart = async (productId: string, quantity: number) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    // setCart(cart);
  };

  return (
    <>
      {data && <Products products={data.data} onAddToCart={handleAddToCart} />}{" "}
    </>
  );
};

export default ShopPage;
