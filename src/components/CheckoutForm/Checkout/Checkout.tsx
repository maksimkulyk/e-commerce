import { FC, useEffect, useState } from "react";
import { Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/commerce";
import { Cart as ICart } from "@chec/commerce.js/types/cart";

import useStyles from "../checkoutStyles";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { ShippingData } from "../../../types";
import { CheckoutCaptureResponse } from "@chec/commerce.js/types/checkout-capture-response";
import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";

interface Props {
  cart: ICart;
  order: CheckoutCaptureResponse;
  onCaptureCheckout: (
    checkoutTokenId: string,
    newOrder: CheckoutCapture
  ) => void;
  error: string;
}

const steps = ["Shipping address", "Payment Details"];

const Checkout: FC<Props> = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState<ShippingData>({});
  const [checkoutToken, setCheckoutToken] = useState<CheckoutToken | null>(
    null
  );
  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckoutToken(token);
      } catch (error) {}
    };

    if (cart.id) generateToken();
  }, [cart.id]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data: ShippingData) => {
    setShippingData(data);
    nextStep();
  };

  const Confirmation = () => <div>Confirmation</div>;

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
        onCaptureCheckout={onCaptureCheckout}
      />
    );

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
