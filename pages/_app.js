import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/user';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';



const store = configureStore({
  reducer: {
    user: userReducer,
   
  },
});

function App({ Component, pageProps }) {
  const router = useRouter();
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
