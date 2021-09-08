import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "./components";
import { appRoutes } from "./routes/appRoutes";
import { ShopPage } from "./pages";
import { Routes } from "./types.dt";

const App = () => {
  console.log(appRoutes);
  return (
    <BrowserRouter>
      {/*<Navbar totalItems={cart.total_items} />*/}
      <Navbar totalItems={4} />
      <Switch>
        {appRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
