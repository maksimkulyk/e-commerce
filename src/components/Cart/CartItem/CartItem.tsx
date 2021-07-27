import { LineItem } from "@chec/commerce.js/types/line-item";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React, { FC } from "react";

import useStyles from "./cartItemStyles";

interface Props {
  item: LineItem;
}

const CartItem: FC<Props> = ({ item }) => {
  const classes = useStyles();
  const { media, name, line_total, quantity } = item;

  return (
    <Card>
      <CardMedia
        image={media.source}
        alt={name}
        className={classes.media}
        component="img"
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="h5">{line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small">
            -
          </Button>
          <Typography>{quantity}</Typography>
          <Button type="button" size="small">
            +
          </Button>
        </div>
        <Button variant="contained" type="button" color="secondary">
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
