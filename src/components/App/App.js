import { useEffect, useState } from 'react';
import './App.css';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  /** Состояния */
  const [initialized, setInitialized] = useState(false);
  const [currentUser, setCurrentUser] = useState({ '_id': '', 'name': '', 'email': '', 'isLoggedIn': false });
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
      .catch(err => {
        console.log(`${err.statusCode}. ${err.message}`);
      });
  }

  const handleLogin = (email, password) => {
    mainApi.login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        mainApi.setAuthorization(res.token);
        setCurrentUser({ ...res.user, isLoggedIn: true });
      })
      .catch(err => {
        console.log(`${err.statusCode}. ${err.message}`);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('saved-movies');
    localStorage.removeItem('movies-request');
    localStorage.removeItem('movies-filter');
    localStorage.removeItem('saved-movies-request');
    localStorage.removeItem('saved-movies-filter');
    mainApi.setAuthorization('');
    setCurrentUser({ _id: '', name: '', email: '', isLoggedIn: false });
  }

  const handleEditProfile = (name, email) => {
    mainApi.updateUserData(name, email)
      .then((res) => {
        setCurrentUser({ ...res.data, isLoggedIn: currentUser.isLoggedIn });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** Эффекты */
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      mainApi.setAuthorization(localStorage.getItem('jwt'));
      mainApi.getUserData()
        .then((res) => {
          setCurrentUser({ ...res.data, isLoggedIn: true });          
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setInitialized(true);          
        });
    } else {
      mainApi.setAuthorization('');
      setInitialized(true);            
    }
  }, []);

  if (initialized) {
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
              {currentUser.isLoggedIn ?
                <Redirect to="/movies" />
                :
                <main>
                  <Register onSubmit={handleRegister} />
                </main>
              }
            </Route>
            <Route exact path="/signin">
              {currentUser.isLoggedIn ?
                <Redirect to="/movies" />
                :
                <main>
                  <Login onSubmit={handleLogin} />
                </main>
              }
            </Route>

            <ProtectedRoute exact path="/movies" loggedIn={currentUser.isLoggedIn}>
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
            </ProtectedRoute>

            <ProtectedRoute exact path="/saved-movies" loggedIn={currentUser.isLoggedIn}>
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
            </ProtectedRoute>

            <ProtectedRoute exact path="/profile" loggedIn={currentUser.isLoggedIn}>
              <Header
                isLanding={false}
                onButtonClick={handleLoginButtonClick}
                onBurgerClick={handleBurgerClick}
              />
              <main>
                <Profile
                  isBurgerMenuOpen={isBurgerMenuOpen}
                  onBurgerMenuClose={handleBurgerMenuClose}
                  onEditProfile={handleEditProfile}
                  onLogout={handleLogout}
                />
              </main>
            </ProtectedRoute>

            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </CurrentUserContext.Provider>
    );
  } else {
    return <></>;
  }

}

export default App;
