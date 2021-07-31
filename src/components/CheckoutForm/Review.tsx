import { FC } from "react";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";

interface Props {
  checkoutToken: CheckoutToken | null;
}

const Review: FC<Props> = ({ checkoutToken }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {checkoutToken &&
          checkoutToken.live.line_items.map((product) => (
            <ListItem style={{ padding: "10px 0" }} key={product.id}>
              <ListItemText
                primary={product.name}
                secondary={`Quantity: ${product.quantity}`}
              />
              <Typography variant="body2">
                {product.line_total.formatted_with_symbol}
              </Typography>
            </ListItem>
          ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {checkoutToken && checkoutToken.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
