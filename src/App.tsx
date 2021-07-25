import { useEffect, useState } from "react";
import { commerce } from "./lib/commerce";
import { Navbar, Products } from "./components";
import { Product } from "@chec/commerce.js/types/product";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <Products products={products} />
    </div>
  );
};

export default App;
