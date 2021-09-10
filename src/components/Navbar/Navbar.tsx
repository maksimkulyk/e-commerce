import { ShoppingCart } from "@material-ui/icons";
import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";

import useStyles from "./navbarStyles";
import logo from "../../assets/commerce-logo.png";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { Routes } from "../../types.dt";
import { useGetCartQuery } from "../../services/cart";

interface Props {}

const Navbar: FC<Props> = () => {
  const classes = useStyles();
  const location = useLocation();
  const { data: cart } = useGetCartQuery();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="E-commerce"
              height="25px"
              className={classes.image}
            />
            E-commerce
          </Typography>
          <div className={classes.grow} />
          <Link to={Routes.SHOP_PAGE}>Shop</Link>
          {/*{location.pathname === "/" && (*/}
          <div>
            <IconButton
              component={Link}
              to={Routes.CART_PAGE}
              aria-label="Show cart items"
              color="inherit"
            >
              <Badge badgeContent={cart?.total_items} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          {/*)}*/}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
