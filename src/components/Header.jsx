import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      alert("Erro ao sair: " + err.message);
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/pokeball.png" alt="Pokéball" className="logo-icon" />
          <h1>Pokédex</h1>
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          {user ? (
            <>
              <Link to="/profile" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="nav-icon">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="nav-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="nav-icon">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="nav-icon">
                  <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
                </svg>
                Entrar
              </Link>
              <Link to="/register" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="nav-icon">
                  <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Cadastrar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
