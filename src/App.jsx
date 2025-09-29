import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Novo contexto
import Header from "./components/Header";
import Home from "./pages/Home";
import PokemonDetails from "./pages/PokemonDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./pages/Profile"; // Nova página protegida
import "./App.css";

const PrivateRoute = ({ children }) => {
  const { user, loadingAuth } = useAuth();
  
  if (loadingAuth) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
