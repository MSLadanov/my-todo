import { createStore } from 'redux';
import authReducer from './reducers/authReducer';

const SAVE_STATE_KEY = 'reduxState';

function saveState (state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(SAVE_STATE_KEY, serializedState);
  } catch (err) {
    console.error('Ошибка при сохранении состояния:', err);
  }
};

function loadState () {
  try {
    const serializedState = localStorage.getItem(SAVE_STATE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Ошибка при загрузке состояния:', err);
    return undefined;
  }
};

const persistedState = loadState();

const store = createStore(authReducer, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

export default store