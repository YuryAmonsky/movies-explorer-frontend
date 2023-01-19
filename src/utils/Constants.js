/** API URLs */
export const MAIN_API = 'https://api.amo.movies-explorer.nomoredomains.club';
export const BEATFILM = 'https://api.nomoreparties.co';

// eslint-disable-next-line
export const NAME_PATTERN="^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё\ \-]*[A-Za-zА-Яа-яЁё]$";

/** Тексты ошибок валидации форм*/
export const INVLAID_NAME='Имя: от 2х до 30 символов (русские, английские буквы, пробел или дефис.)';
export const INVLAID_EMAIL='E-mail: Неверный формат адреса';
export const INVLAID_PASSWORD='Пароль: должен содержать не менее 8 символов';

/** Названия ключей сохраняемых в LocalStorage */
export const LS_KEY_MOVIES_REQUEST = 'movies-request';
export const LS_KEY_MOVIES_FILTER = 'movies-filter';
export const LS_KEY_MOVIES = 'movies';
export const LS_KEY_SAVED_MOVIES_REQUEST = 'saved-movies-request';
export const LS_KEY_SAVED_MOVIES_FILTER = 'saved-movies-filter';
export const LS_KEY_SAVED_MOVIES = 'saved-movies';

/** Состояния запросов фильмов */
export const REQ_STATE_LOADING = 'loading';
export const REQ_STATE_EMPTY = 'isEmpty';
export const REQ_STATE_NOT_FOUND = 'notFound';
export const REQ_STATE_SUCCESS = 'success';
export const REQ_STATE_FAILED = 'failed';


/** Тексты уведомлений о завершении запросов к API */
export const ALERT_GET_MOVIES_FAILED = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const ALERT_REQUEST_IS_EMPTY = 'Нужно ввести ключевое слово';
export const ALERT_NOTHING_FOUND = 'Ничего не найдено';
export const ALERT_USER_REGISTERED = 'ВЫ успешно зарегистрировались';
export const ALERT_PROFILE_UPDATED = 'Профиль успешно обновлен';
