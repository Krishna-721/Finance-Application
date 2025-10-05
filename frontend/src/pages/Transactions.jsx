import { useState, useEffect } from "react";
import {transactionAPI} from '../services/api'

function Transactions(){
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData]=useState({
        amount:"",
        type:"expense",
        category:"",
        description:"",
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData=async()=>{
        try{
            const [transRes,summaryRes] = await Promise.all([
                transactionAPI.getAll(),
                transactionAPI.getSummary()
            ]);
            setTransactions(transRes.data);
            transactionAPI(summaryRes.data);
        }
        catch(error){
            console.error("Error fetching data:", error)
        }
        finally{
            setLoading(false);
        }
    };
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await transactionAPI.create({
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date).toISOString()
      });
      setShowForm(false);
      setFormData({
        amount: '',
        type: 'expense',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      fetchData();
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

   const handleDelete = async (id) => {
    if (window.confirm('Delete this transaction?')) {
      try {
        await transactionAPI.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  if (loading) return <div style={{padding: '20px'}}>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Transactions</h1>

      {summary && (
        <div style={{ display:"block", gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#d9e4d9ff', padding: '20px', borderRadius: '8px' }}>
            <h3>Total Income</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>${summary.total_income.toFixed(2)}</p>
          </div>
          <div style={{ backgroundColor: '#e0d9daff', padding: '20px', borderRadius: '8px' }}>
            <h3>Total Expenses</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>${summary.total_expenses.toFixed(2)}</p>
          </div>
          <div style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '8px' }}>
            <h3>Net Savings</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>${summary.net_savings.toFixed(2)}</p>
          </div>
        </div>
      )}

      <button 
        onClick={() => setShowForm(!showForm)}
        style={{padding: '10px 20px', marginBottom: '20px', backgroundColor: '#0274efff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
      >
        {showForm ? 'Cancel' : 'Add Transaction'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#302f2fff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
            <div>
              <label>Amount:</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Type:</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label>Category:</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label>Description:</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
          </div>
          <button type="submit" style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
            Add Transaction
          </button>
        </form>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#636060ff' }}>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Date</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Category</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Description</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Type</th>
            <th style={{ padding: '10px', textAlign: 'right', borderBottom: '2px solid #ddd' }}>Amount</th>
            <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id} style={{ borderBottom: '1px solid #ba9b9bff' }}>
              <td style={{ padding: '10px' }}>{new Date(t.date).toLocaleDateString()}</td>
              <td style={{ padding: '10px' }}>{t.category}</td>
              <td style={{ padding: '10px' }}>{t.description || '-'}</td>
              <td style={{ padding: '10px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  backgroundColor: t.type === 'income' ? '#e8f5e9' : '#ffebee',
                  color: t.type === 'income' ? '#2e7d32' : '#c62828'
                }}>
                  {t.type}
                </span>
              </td>
              <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
                ${t.amount.toFixed(2)}
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <button 
                  onClick={() => handleDelete(t.id)}
                  style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;