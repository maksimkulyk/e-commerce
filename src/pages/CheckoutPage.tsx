import { FC, useState } from "react";
import { Checkout } from "../components";
import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import { commerce } from "../lib/commerce";
import { CheckoutCaptureResponse } from "@chec/commerce.js/types/checkout-capture-response";

interface CheckoutPageProps {}

const CheckoutPage: FC<CheckoutPageProps> = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [order, setOrder] = useState<CheckoutCaptureResponse>(
    {} as CheckoutCaptureResponse
  );

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    // setCart(newCart);
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

  return (
    <Checkout
      order={order}
      onCaptureCheckout={handleCaptureCheckout}
      error={errorMessage}
    />
  );
};

export default CheckoutPage;
