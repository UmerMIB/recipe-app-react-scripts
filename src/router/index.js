import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";
import Navbar from "../Components/Navbar";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        {routes.map(({ Component, key, path }) => (
          <Route
            key={key}
            path={path}
            component={(props) => <Component page={key} {...props} />}
            exact
          />
        ))}
      </Switch>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </Router>
  );
};

export default App;
