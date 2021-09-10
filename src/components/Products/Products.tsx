import { Product as IProduct } from "@chec/commerce.js/types/product";
import { Grid } from "@material-ui/core";
import { FC } from "react";
import Product from "./Product/Product";

import useStyles from "./productsStyles";
import { useGetProductsQuery } from "../../services/products";

interface Props {}

const Products: FC<Props> = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products &&
          products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
      </Grid>
    </main>
  );
};

export default Products;
