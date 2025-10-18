import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Don't show navbar on login page
  if (location.pathname === '/') return null;

  const navStyle = {
    backgroundColor: '#2c3e50',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const linkStyle = (path) => ({
    padding: '8px 16px',
    marginRight: '10px',
    backgroundColor: location.pathname === path ? '#34495e' : 'transparent',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '16px'
  });

  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ margin: 0, marginRight: '30px' }}>💰 Finance Bot</h2>
        <button onClick={() => navigate('/dashboard')} style={linkStyle('/dashboard')}>
          Dashboard
        </button>
        <button onClick={() => navigate('/transactions')} style={linkStyle('/transactions')}>
          Transactions
        </button>
        <button onClick={() => navigate('/chat')} style={linkStyle('/chat')}>
          Chat
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '20px' }}>👤 {user?.full_name}</span>
        <button 
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;