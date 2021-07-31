import { FC } from "react";
import { Grid, TextField } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

interface Props {
  name: string;
  label: string;
}

const FormInput: FC<Props> = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField {...field} fullWidth label={label} required />
        )}
      />
    </Grid>
  );
};

export default FormInput;
