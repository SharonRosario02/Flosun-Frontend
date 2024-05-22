import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppContextProvider } from "./appContext";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
     <PrimeReactProvider>

    <AppContextProvider>
      <App />
    </AppContextProvider>
     </PrimeReactProvider>
  </React.StrictMode>
);
