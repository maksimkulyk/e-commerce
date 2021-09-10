import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "./components";
import { appRoutes } from "./routes/appRoutes";
import { useGetCartQuery } from "./services/cart";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
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
