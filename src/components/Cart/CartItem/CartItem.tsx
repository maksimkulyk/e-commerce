import { LineItem } from "@chec/commerce.js/types/line-item";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { FC } from "react";

import useStyles from "./cartItemStyles";

interface Props {
  item: LineItem;
  handleRemoveFromCart: (productId: string) => void;
  handleUpdateCartQuantity: (productId: string, quantity: number) => void;
}

const CartItem: FC<Props> = ({
  item,
  handleRemoveFromCart,
  handleUpdateCartQuantity,
}) => {
  const classes = useStyles();
  const { id, media, name, line_total, quantity } = item;

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
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQuantity(id, quantity - 1)}
          >
            -
          </Button>
          <Typography>{quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQuantity(id, quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => handleRemoveFromCart(id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
