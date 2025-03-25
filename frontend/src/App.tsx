import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

// Lazy loaded pages
const LoginPage = lazy(() => import("./pages/Loginpage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const HomePage = lazy(() => import("./pages/HomeScreen"));

// Type for route wrapper components
interface RouteProps {
  children: ReactNode;
}

// PrivateRoute Component
const PrivateRoute = ({ children }: RouteProps) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

// OpenRoute Component
const OpenRoute = ({ children }: RouteProps) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/home" replace /> : children;
};

const App = () => (
  <Router>
    <Suspense fallback={<div className="flex justify-center items-center">Loading...</div>}>
      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes (Login & Register) */}
        <Route
          path="/login"
          element={
            <OpenRoute>
              <LoginPage />
            </OpenRoute>
          }
        />
        <Route
          path="/register"
          element={
            <OpenRoute>
              <RegisterPage />
            </OpenRoute>
          }
        />

        {/* Private routes (Home) */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
    <Toaster />
  </Router>
);

export default App;
