import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { Button, Divider, Typography } from "@material-ui/core";
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import { FC } from "react";
import { ShippingData } from "../../types";
import Review from "./Review";

interface Props {
  checkoutToken: CheckoutToken;
  shippingData: ShippingData;
  nextStep: () => void;
  backStep: () => void;
  onCaptureCheckout: (
    checkoutTokenId: string,
    newOrder: CheckoutCapture
  ) => void;
}

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY as string
);

const PaymentForm: FC<Props> = ({
  checkoutToken,
  shippingData,
  nextStep,
  backStep,
  onCaptureCheckout,
}) => {
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    elements: StripeElements | null,
    stripe: Stripe | null
  ) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (cardElement && checkoutToken) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.log(error);
      } else {
        const orderData: any = {
          line_items: checkoutToken.live.line_items,
          customer: {
            firstname: shippingData.firstName,
            lastname: shippingData.lastName,
            email: shippingData.email,
          },
          shipping: {
            name: "Primary",
            street: shippingData.address1,
            town_city: shippingData.city,
            county_state: shippingData.shippingSubdivision,
            postal_zip_code: shippingData.zip,
            country: shippingData.shippingCountry,
          },
          fulfillment: {
            shipping_method: shippingData.shippingOption,
          },
          payment: {
            gateway: "stripe",
            stripe: {
              payment_method_id: paymentMethod!.id,
            },
          },
        };

        onCaptureCheckout(checkoutToken.id, orderData);
        nextStep();
      }
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(event) => handleSubmit(event, elements, stripe)}>
              <CardElement />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay&nbsp;
                  {checkoutToken &&
                    checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
