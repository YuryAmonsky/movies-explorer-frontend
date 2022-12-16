import './App.css';
import Main from '../Main/Main';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Header isLanding={true}></Header>
          <main>
            <Main />
          </main>
          <Footer />
        </Route>
        <Route path="/movies">
          <Header isLanding={false} />
          <main>
            <Movies />
          </main>
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header isLanding={false} />
          <main>
            <SavedMovies />
          </main>
          <Footer />
        </Route>
        <Route path="/profile">
          <Header isLanding={false} />
          <main>
            <Profile/>
          </main>         
        </Route>              
      </Switch>
    </div>
  );
}

export default App;
