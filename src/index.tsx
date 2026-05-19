import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

import MapApp from "./pages/MapApp";
import MyAccount from "./pages/MyAccount";
import FourOhFour from "./pages/FourOhFour";
import Authentication from "./pages/Authentication";
import ErrorFallback from "./pages/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import store from "./store";

// Styles
import "./index.css";
import "./assets/styles/style.scss";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/app" element={<MapApp />} />
          <Route path="/app/my-account/*" element={<MyAccount />} />
          <Route path="/auth/*" element={<Authentication />} />
          <Route path="/" element={<Navigate to="/app" replace={true} />} />
          <Route path="*" element={<FourOhFour />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>
);
