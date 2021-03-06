import { FC } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./productStyles";
import { Product as IProduct } from "@chec/commerce.js/types/product";

interface Props {
  product: IProduct;
  onAddToCart: (productId: string, quantity: number) => void;
}

const Product: FC<Props> = ({ product, onAddToCart }) => {
  const classes = useStyles();
  const { id, name, description, price, media } = product;

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={media.source} title={name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          <Typography variant="h5">{price.formatted_with_symbol}</Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: description }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(id, 1)}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
