import './App.css';
import Main from '../Main/Main';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { useEffect, useState } from 'react';

function App() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const handleLogin = () => {
    history.push('/signin');
  }
  const handleBurgerClick = () => {
    setIsBurgerMenuOpen(true);
  }
  const handleBurgerMenuClose = () => {
    setIsBurgerMenuOpen(false);
  }

  const handleFormSubmit = () => {
    history.push('/movies');
  }

  useEffect(() => {
    if (location.pathname === '/') {
      setIsBurgerMenuOpen(false);
    }
  }, [location]);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Header
            isLanding={true}
            onButtonClick={handleLogin}
          >
          </Header>
          <main>
            <Main />
          </main>
          <Footer />
        </Route>
        <Route exact path="/signup">
          <main>
            <Register onSubmit={handleFormSubmit} />
          </main>
        </Route>
        <Route exact path="/signin">
          <main>
            <Login onSubmit={handleFormSubmit} />
          </main>
        </Route>
        <Route path="/movies">
          <Header
            isLanding={false}
            onBurgerClick={handleBurgerClick}
          />
          <main>
            <Movies
              isBurgerMenuOpen={isBurgerMenuOpen}
              onBurgerMenuClose={handleBurgerMenuClose}
            />
          </main>
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header
            isLanding={false}
            onBurgerClick={handleBurgerClick}
          />
          <main>
            <SavedMovies
              isBurgerMenuOpen={isBurgerMenuOpen}
              onBurgerMenuClose={handleBurgerMenuClose}
            />
          </main>
          <Footer />
        </Route>
        <Route path="/profile">
          <Header
            isLanding={false}
            onBurgerClick={handleBurgerClick}
          />
          <main>
            <Profile
              isBurgerMenuOpen={isBurgerMenuOpen}
              onBurgerMenuClose={handleBurgerMenuClose}
            />
          </main>
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
