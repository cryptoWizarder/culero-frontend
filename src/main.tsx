import * as ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router/index.tsx'
import {store} from "./store";
import './index.css'
import { ContentsProvider } from './providers'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from "redux-persist/integration/react";
import { Auth0Provider } from "@auth0/auth0-react";

const persistor = persistStore(store);

// const onRedirectCallback = (appState) => {
//   history.push(
//     appState && appState.returnTo ? appState.returnTo : window.location.pathname
//   );
// };

const providerConfig = {
  domain: 'dev-pvtjzpj4xiwfl7y3.us.auth0.com',
  clientId: 'IPPkrgRCjUTOcrRxWRMRdvMyxAhzV8Rl',
  // onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <ContentsProvider>
      <Auth0Provider {...providerConfig}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </Auth0Provider>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ContentsProvider>,
)
