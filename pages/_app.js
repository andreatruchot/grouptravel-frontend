import React from 'react';
import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // utilise localStorage par défaut
import userReducer from '../reducers/user'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import invitationReducer from '../reducers/invitation';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Seuls `user` est persisté
};

const rootReducer = combineReducers({
  user: userReducer,
  invitation: invitationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore ces actions pour les checks de sérialisation
      },
    }),
});
export const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <>
      <React.StrictMode>
        <Provider store={store}>
          {/* Ajout de la condition `loading` pour gérer l'état de chargement lors de la réhydratation */}
          <PersistGate loading={null} persistor={persistor}>
            <Head>
              <title>FellowVoyagers</title>
              <meta name="description" content="Site d'organisation de voyages entre amis." />
              <meta property="og:url" content="https://www.fellowvoyagers.fr" />
              <meta property="og:image" content="https://www.portfolio-andrea-truchot.com/globe.png" />
              <link rel="icon" href="/favicon.png" />
             
            </Head>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </React.StrictMode>
    </>
  );
}

export default App;
