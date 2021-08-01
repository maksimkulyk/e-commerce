import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { commerce } from "./lib/commerce";
import { Cart as ICart } from "@chec/commerce.js/types/cart";
import { Product } from "@chec/commerce.js/types/product";
import { Cart, Checkout, Navbar, Products } from "./components";
import { CheckoutCaptureResponse } from "@chec/commerce.js/types/checkout-capture-response";
import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<ICart>({} as ICart);
  const [order, setOrder] = useState<CheckoutCaptureResponse>(
    {} as CheckoutCaptureResponse
  );
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    if (cart) setCart(cart);
  };

  const handleAddToCart = async (productId: string, quantity: number) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
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

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (
    checkoutTokenId: string,
    newOrder: CheckoutCapture
  ) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <BrowserRouter>
      <>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartQuantity={handleUpdateCartQuantity}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
        </Switch>
      </>
    </BrowserRouter>
  );
};

export default App;
