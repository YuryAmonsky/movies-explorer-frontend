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
import Notice from '../Notice/Notice';
import { ALERT_PROFILE_UPDATED, ALERT_USER_REGISTERED } from '../../utils/Constants';


function App() {
  /** Состояния */
  const [initialized, setInitialized] = useState(false);
  const [currentUser, setCurrentUser] = useState({ '_id': '', 'name': '', 'email': '', 'isLoggedIn': false });
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [noticeState, setNoticeState] = useState({ message: '', isOpen: false, isSuccess: false });
  const [isFormDisaled, setisFormDisabled] = useState(false);
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
    setisFormDisabled(true);
    mainApi.register(name, email, password)
      .then(res => {
        setNoticeState({ message: ALERT_USER_REGISTERED, isOpen: true, isSuccess: true });
        return mainApi.login(email, password);
      })
      .then(loginRes => {
        localStorage.setItem('jwt', loginRes.token);
        mainApi.setAuthorization(loginRes.token);
        setCurrentUser({ ...loginRes.user, isLoggedIn: true });
      })
      .catch(err => {
        console.log(`${err.statusCode}. ${err.message}`);
        setNoticeState({ message: err.message, isOpen: true, isSuccess: false });
      })
      .finally(()=>{
        setisFormDisabled(false);
      });      
  }

  const handleLogin = (email, password) => {
    setisFormDisabled(true);
    mainApi.login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        mainApi.setAuthorization(res.token);
        setCurrentUser({ ...res.user, isLoggedIn: true });
      })
      .catch(err => {
        console.log(`${err.statusCode}. ${err.message}`);
        setNoticeState({ message: err.message, isOpen: true, isSuccess: false });
      })
      .finally(()=>{
        setisFormDisabled(false);
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
    setisFormDisabled(true);
    mainApi.updateUserData(name, email)
      .then((res) => {
        setNoticeState({ message: ALERT_PROFILE_UPDATED, isOpen: true, isSuccess: true });
        setCurrentUser({ ...res.data, isLoggedIn: currentUser.isLoggedIn });
      })
      .catch((err) => {
        console.log(`${err.statusCode}. ${err.message}`);
        setNoticeState({ message: err.message, isOpen: true, isSuccess: false });
      })
      .finally(()=>{
        setisFormDisabled(false);
      });
  };

  const handleNoticeButtonClick = () => {
    setNoticeState({ message: '', isOpen: false, isSuccess: false });
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
          console.log(`${err.statusCode}. ${err.message}`);
          setNoticeState({ message: err.message, isOpen: true, isSuccess: false });
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
                  <Register 
                    onSubmit={handleRegister} 
                    isFormDisabled={isFormDisaled} 
                  />
                </main>
              }
            </Route>
            <Route exact path="/signin">
              {currentUser.isLoggedIn ?
                <Redirect to="/movies" />
                :
                <main>
                  <Login
                    onSubmit={handleLogin}
                    isFormDisabled={isFormDisaled}
                  />
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
                  setNoticeState={setNoticeState}
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
                  setNoticeState={setNoticeState}
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
                  isFormDisabled={isFormDisaled}
                />
              </main>
            </ProtectedRoute>

            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <Notice
            isOpen={noticeState.isOpen}
            message={noticeState.message}
            isSuccess={noticeState.isSuccess}
            onButtonClick={handleNoticeButtonClick}
          />
        </div>
      </CurrentUserContext.Provider>
    );
  } else {
    return <></>;
  }

}

export default App;
