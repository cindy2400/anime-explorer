import { Route } from "react-router-dom";
import "./App.css";
import Anime from "./component/Anime";
import DetailAnime from "./component/DetailAnime";
import FavoritesAnime from "./component/FavoritesAnime";
import Home from "./component/Home";
import Header from "./component/ui/Header";

function App() {
  return (
    <div>
      <Header />
      <>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/trending" exact>
          <Anime type="trending" />
        </Route>
        <Route path="/home/:animeId">
          <DetailAnime />
        </Route>
        <Route path="/popular">
          <Anime type="popular" />
        </Route>
        <Route path="/upcoming">
          <Anime type="upcoming" />
        </Route>
        <Route path="/favorites">
          <FavoritesAnime />
        </Route>
      </>
    </div>
  );
}

export default App;
