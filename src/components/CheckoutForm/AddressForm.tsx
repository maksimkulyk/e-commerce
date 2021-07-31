import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "./CustomFormInput";
import { commerce } from "../../lib/commerce";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { GetShippingOptionsResponse } from "@chec/commerce.js/features/checkout";
import { SelectOptions, ShippingData } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  checkoutToken: CheckoutToken | null;
  next: (data: ShippingData) => void;
}

const AddressForm: FC<Props> = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState<SelectOptions[]>(
    []
  );
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState<
    SelectOptions[]
  >([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState<SelectOptions[]>([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId: string) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    const countriesArr = Object.entries(countries).map(([code, name]) => ({
      id: code,
      label: name,
    }));

    setShippingCountries(countriesArr);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode: string) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    const subdivisionsArr = Object.entries(subdivisions).map(
      ([code, name]) => ({
        id: code,
        label: name,
      })
    );

    setShippingSubdivisions(subdivisionsArr);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchOptions = async (
    checkoutTokenId: string,
    country: string,
    region: string | undefined
  ) => {
    //@ts-ignore
    const options: GetShippingOptionsResponse[] =
      await commerce.checkout.getShippingOptions(checkoutTokenId, {
        country,
        region,
      });

    const optionsArr = options.map((option) => ({
      id: option.id,
      label: `${option.description} - (${option.price.formatted_with_symbol})`,
    }));

    setShippingOptions(optionsArr);
    setShippingOption(optionsArr[0].id);
  };

  useEffect(() => {
    if (checkoutToken) fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (checkoutToken && shippingSubdivision)
      fetchOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [checkoutToken, shippingCountry, shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput name="firstName" label="First name" />
            <FormInput name="lastName" label="Last name" />
            <FormInput name="address1" label="Address" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="ZIP / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(event) =>
                  setShippingCountry(event.target.value as string)
                }
              >
                {shippingCountries.map(({ id, label }) => (
                  <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(event) =>
                  setShippingSubdivision(event.target.value as string)
                }
              >
                {shippingSubdivisions.map(({ id, label }) => (
                  <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Option</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(event) =>
                  setShippingOption(event.target.value as string)
                }
              >
                {shippingOptions.map(({ id, label }) => (
                  <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
