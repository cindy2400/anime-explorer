import './App.css';
import Auth from './component/Auth';
import Header from './component/ui/Header';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <Route path="/login">
        <Auth type="login" />
      </Route>
      <Route path="/register">
        <Auth type="register" />
      </Route>
    </div>
  );
}

export default App;
