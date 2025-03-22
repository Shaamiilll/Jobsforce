import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';



const Loginpage = lazy(() => import('./pages/Loginpage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Redirect from "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Lazy loaded login page */}
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Loginpage />} />

        {/* Simple Home Page */}
        <Route path="/home" element={<h1 className="text-3xl font-bold underline">Home Page</h1>} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
