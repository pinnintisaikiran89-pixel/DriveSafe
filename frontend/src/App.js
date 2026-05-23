import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import SplashScreen from "./pages/SplashScreen";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import MapPage from "./pages/MapPage";
import RouteSafety from "./pages/RouteSafety";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Splash Screen */}
        <Route
          path="/"
          element={<SplashScreen />}
        />

        {/* Home */}
        <Route
          path="/home"
          element={<Home />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Prediction */}
        <Route
          path="/predict"
          element={<Predict />}
        />

        {/* Map */}
        <Route
          path="/map"
          element={<MapPage />}
        />

        {/* Route Safety */}
        <Route
          path="/route-safety"
          element={<RouteSafety />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;