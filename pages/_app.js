import '../styles/globals.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useState, useEffect} from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import LoadingBar from 'react-top-loading-bar'
import {useRouter} from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from '../components/preloader';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('dark-theme');
  const [progress, setProgress] = useState(0);
  const [load, setLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setLoad(false), 5000);
  },[]);

  useEffect(() => {
    router.events.on('routeChangeStart',() => {
      setProgress(40);
    });

    router.events.on('routeChangeComplete',() => {
      setProgress(100);
    });
    return () => {
      router.events.off('routeChangeStart',() => {
        setProgress(40);
      });

      router.events.off('routeChangeComplete',() => {
        setProgress(100);
      });
    }
  },[router.query]);

  // web push
  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
        OneSignal.init({
            appId: "87df84a0-00d7-472f-83ba-8f6d3e459e3a",
            safari_web_id: "web.onesignal.auto.487bfeae-71a3-407e-85d8-1b40bd783a80",
            notifyButton: {
                enable: true,
            },

            allowLocalhostAsSecureOrigin: true,
          });
      });

      return () => {
          window.OneSignal = undefined;
      };
  }, []);

  return(
    <>
      {!load ?
        <Provider store={store}>
        <LoadingBar
          color='crimson'
          loaderSpeed={10}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Header theme={theme} setTheme={setTheme}/>
        <Component {...pageProps} theme={theme} setTheme={setTheme}/>
        <Footer theme={theme}/>

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme= {theme == 'light-theme' ? "dark" : 'light'}
        />
      </Provider>:
      <Preloader/>
      }
    </>
  );
}

export default MyApp
