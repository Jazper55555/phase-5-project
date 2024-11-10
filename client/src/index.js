import React from "react";
import App from "./components/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from '@auth0/auth0-react'

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <Auth0Provider
    domain="dev-xd7ykqvwbz8sm235.us.auth0.com"
    clientId="AuCYbAcupKulEMPpgc8s20fxhBmvKPec"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);
