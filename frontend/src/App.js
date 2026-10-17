
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { useAuth } from "./contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";

// Pages
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import MapPage from "./pages/MapPage";
import RouteSafety from "./pages/RouteSafety";
import Profile from "./pages/Profile";
import History from "./pages/History";
import ReportAccident from "./pages/ReportAccident";

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until Firebase authentication has been checked
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080b12] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-red-500" />
          <p className="mt-4 text-sm text-white/60">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes: authentication only */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Every other route requires login */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SplashScreen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/predict"
        element={
          <ProtectedRoute>
            <Predict />
          </ProtectedRoute>
        }
      />

      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <MapPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/route-safety"
        element={
          <ProtectedRoute>
            <RouteSafety />
          </ProtectedRoute>
        }
      />

      <Route
        path="/report-accident"
        element={
          <ProtectedRoute>
            <ReportAccident />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      {/* Unknown routes also require login */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Navigate to="/dashboard" replace />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
