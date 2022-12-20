import { Redirect, Route } from "react-router-dom";
import "./App.css";
import DetailAnime from "./component/DetailAnime";
import FavoritesAnime from "./component/FavoritesAnime";
import Home from "./component/Home";
import Header from "./component/ui/Header";

function App() {
  return (
    <div>
      <Header />
      <>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <Home type="trending" />
        </Route>
        <Route path="/home/:animeId">
          <DetailAnime />
        </Route>
        <Route path="/popular">
          <Home type="popular" />
        </Route>
        <Route path="/upcoming">
          <Home type="upcoming" />
        </Route>
        <Route path="/favorites">
          <FavoritesAnime />
        </Route>
      </>
    </div>
  );
}

export default App;
