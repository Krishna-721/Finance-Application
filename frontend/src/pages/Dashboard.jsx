import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #fafafaff', paddingBottom: '10px' }}>
        <h1>Dashboard</h1>
        <div>
          <button onClick={() => navigate('/transactions')} style={{ padding: '8px 16px', marginRight: '10px' }}>
            Transactions
          </button>
          <button onClick={handleLogout} style={{ padding: '8px 16px' }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#8c8282ff', padding: '20px', borderRadius: '8px' }}>
        <h2>Welcome, {user?.full_name}!</h2>
        <p>Email: {user?.email}</p>
        <p>Click "Transactions" above to manage your expenses and income.</p>
      </div>
    </div>
  );
}

export default Dashboard;