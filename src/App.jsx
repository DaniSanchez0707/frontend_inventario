import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./pages/Dashboard";
import { AuthenticationProvider } from "./context/AuthenticationContext";
import ProtectedRoutes from "./ProtectedRoutes";
import "./App.css";

function App() {
  return (
    <AuthenticationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes/>}>
            <Route path="dashboard/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthenticationProvider>
  );
}

export default App;
