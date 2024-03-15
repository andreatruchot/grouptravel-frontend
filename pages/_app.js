import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/user'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import invitationReducer from '../reducers/invitation';



// Configure le store Redux en spécifiant le ou les reducers
const store = configureStore({
  reducer: {
    user: userReducer, // user est le nom de la clé dans l'état global
    invitation: invitationReducer,
  },
});

function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Next.js App</title>
        </Head>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default App;
