import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../reducers/user'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import invitationReducer from '../reducers/invitation';
import { ignoreWarnings } from '../middlewares/ignoreWarnings';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], 
};

const rootReducer = combineReducers({
  user: userReducer,
  invitation: invitationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) => ignoreWarnings(getDefault),
})
export const persistor = persistStore(store);


function App({ Component, pageProps }) {

  return (
    <>
      <Provider store={store}>
      <PersistGate loading={<Component {...pageProps} />} persistor={persistor}>
        <Head>
          <title>Next.js App</title>
         </Head>
        <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
