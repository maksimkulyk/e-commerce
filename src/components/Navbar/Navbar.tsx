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

interface Props {
  totalItems: number | undefined;
}

const Navbar: FC<Props> = ({ totalItems }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img
              src={logo}
              alt="E-commerce"
              height="25px"
              className={classes.image}
            />
            E-commerce
          </Typography>
          <div className={classes.grow} />
          <div>
            <IconButton aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
