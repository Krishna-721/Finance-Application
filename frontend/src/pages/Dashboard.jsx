import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { transactionAPI } from '../services/api';
import Charts from '../components/Charts';

function Dashboard() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [transRes, summaryRes] = await Promise.all([
        transactionAPI.getAll(),
        transactionAPI.getSummary()
      ]);
      setTransactions(transRes.data);
      setSummary(summaryRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>

      <div style={{ backgroundColor: '#0f0e0eff', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>Welcome back, {user?.full_name}! 👋</h2>
        <p style={{ color: '#666', marginTop: '10px' }}>
          Manage your finances, track expenses, and chat with your AI assistant.
        </p>
      </div>

      {summary && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginTop: '30px'
        }}>
          <div style={{ backgroundColor: '#2ecc71', color: 'white', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Total Income</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>${summary.total_income.toFixed(2)}</p>
          </div>
          <div style={{ backgroundColor: '#e74c3c', color: 'white', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Total Expenses</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>${summary.total_expenses.toFixed(2)}</p>
          </div>
          <div style={{ backgroundColor: '#3498db', color: 'white', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Net Savings</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>${summary.net_savings.toFixed(2)}</p>
          </div>
          <div style={{ backgroundColor: '#9b59b6', color: 'white', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Transactions</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{summary.transaction_count}</p>
          </div>
        </div>
      )}

      {transactions.length > 0 && <Charts transactions={transactions} />}
    </div>
  );
}

export default Dashboard;