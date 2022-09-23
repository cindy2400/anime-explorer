import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import "./App.css";
import Auth from "./component/Auth";
import Home from "./component/Home";
import Header from "./component/ui/Header";

function App() {
  const token = useSelector((state) => state.auth.token);
  return (
    <div>
      <Header />
      <Route path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login">
        <Auth type="login" />
      </Route>
      <Route path="/register">
        <Auth type="register" />
      </Route>
      {token && (
        <Route path="/home">
          <Home />
        </Route>
      )}
      {token && (
        <Route path="/login">
          <Redirect to="/home" />
        </Route>
      )}
    </div>
  );
}

export default App;
