import { Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import { useState } from "react";
import AddressForm from "../AddressForm";
import useStyles from "../checkoutStyles";
import PaymentForm from "../PaymentForm";

interface Props {}

const steps = ["Shipping address", "Payment Details"];

const Checkout = (props: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const Confirmation = () => <div>Confirmation</div>;

  const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);

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
