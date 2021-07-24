import { Grid } from "@material-ui/core";
import Product from "./Product/Product";

import useStyles from "./productsStyles";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const products: IProduct[] = [
  {
    id: 1,
    name: "Shoes",
    description: "Running shoes.",
    price: "1 500,00 UAH",
    image:
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f9b52c1f-ca36-4492-8836-7a84c6bfd789/quest-3-running-shoes-tHzGtw.png",
  },
  {
    id: 2,
    name: "Macbook",
    description: "Apple Macbook.",
    price: "91 999,00 UAH",
    image: "https://hotline.ua/img/tx/212/2127799955.jpg",
  },
];

const Products = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
