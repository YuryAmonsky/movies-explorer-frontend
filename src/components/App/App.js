import './App.css';
import Main from '../Main/Main';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { useEffect, useState } from 'react';
import { mainApi } from '../../utils/MainApi';

function App() {
  /** Состояния */
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', isLoggedIn: false });    
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const history = useHistory(); 
  
  /** Обработчики */
  const handleLoginButtonClick = () => {
    history.push('/signin');
  }
  const handleBurgerClick = () => {
    setIsBurgerMenuOpen(true);
  }
  const handleBurgerMenuClose = () => {
    setIsBurgerMenuOpen(false);
  }

  const handleLogin = (email, password) => {
    mainApi.login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        mainApi.setAuthorization(res.token);
        setCurrentUser({ ...res.user, isLoggedIn: true });
        console.log(res);
      })
      .catch(err => {
        console.log(`${err.statusCode}. ${err.message}`);
      });
  }

  const handleRegister = (name, email, password) => {
    mainApi.register(name, email, password)
      .then(res => {
        console.log('user registered');
        return mainApi.login(email, password);
      })
      .then(loginRes => {
        localStorage.setItem('jwt', loginRes.token);
        mainApi.setAuthorization(loginRes.token);
        setCurrentUser({ ...loginRes.user, isLoggedIn: true });
        console.log('user authorized');
      })
      .catch(err =>{
        console.log(`${err.statusCode}. ${err.message}`);
      });
  }
  /** Эффекты */
  useEffect(()=>{
    if(currentUser.isLoggedIn){
      history.push('/movies');
    }
  },[currentUser.isLoggedIn, history]);
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header
              isLanding={true}
              onButtonClick={handleLoginButtonClick}
              onBurgerClick={handleBurgerClick}
            >
            </Header>
            <main>
              <Main 
                isBurgerMenuOpen={isBurgerMenuOpen}
                onBurgerMenuClose={handleBurgerMenuClose}
              />
            </main>
            <Footer />
          </Route>
          <Route exact path="/signup">
            <main>
              <Register onSubmit={handleRegister} />
            </main>
          </Route>
          <Route exact path="/signin">
            <main>
              <Login onSubmit={handleLogin} />
            </main>
          </Route>
          <Route path="/movies">
            <Header
              isLanding={false}
              onButtonClick={handleLoginButtonClick}
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
              onButtonClick={handleLoginButtonClick}
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
              onButtonClick={handleLoginButtonClick}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
