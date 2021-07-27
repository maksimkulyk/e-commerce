import { useEffect, useState } from "react";
import { commerce } from "./lib/commerce";
import { Cart, Navbar, Products } from "./components";
import { Product } from "@chec/commerce.js/types/product";
import { Cart as ICart } from "@chec/commerce.js/types/cart";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<ICart>();

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId: string, quantity: number) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <>
      <Navbar totalItems={cart && cart.total_items} />
      {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
      <Cart cart={cart} />
    </>
  );
};

export default App;
