import { useAuth } from "../context/AuthContext";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
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

  if (!user) return null; // Protegido pela PrivateRoute, mas só por segurança

  return (
    <div className="auth-container profile-container">
      <div className="profile-header">
        <svg className="profile-avatar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
        <h2>Meu Perfil</h2>
      </div>
      <div className="profile-info">
        <div className="info-group">
          <label>Email</label>
          <p>{user.email}</p>
        </div>
        <div className="info-group">
          <label>Status da Conta</label>
          <p>
            <span className="status-badge">
              <span className="status-dot"></span>
              Ativo
            </span>
          </p>
        </div>
      </div>
      <button className="auth-button danger-button" onClick={handleLogout}>
        <svg className="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
        </svg>
        Sair da Conta
      </button>
    </div>
  );
};

export default Profile;
