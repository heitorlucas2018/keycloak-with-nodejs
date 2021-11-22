import React from 'react';
import ReactDOM from 'react-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web'

import keycloakConfig, {keycloakProviderInitConfig} from './config/keycloakConfig'

import './index.css';

import reportWebVitals from './reportWebVitals';
import RouterApp from './routers/index ';

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider initOptions={keycloakProviderInitConfig} authClient={keycloakConfig}>
      <RouterApp />
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
