import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function FinancialCharts({ transactions }) {
  // Prepare data for income vs expenses over time
  const getMonthlyData = () => {
    const monthlyData = {};
    
    transactions.forEach(t => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthKey, income: 0, expenses: 0 };
      }
      
      if (t.type === 'income') {
        monthlyData[monthKey].income += t.amount;
      } else {
        monthlyData[monthKey].expenses += t.amount;
      }
    });
    
    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
  };

  // Prepare data for category breakdown
  const getCategoryData = () => {
    const categoryData = {};
    
    transactions.forEach(t => {
      if (t.type === 'expense') {
        if (!categoryData[t.category]) {
          categoryData[t.category] = 0;
        }
        categoryData[t.category] += t.amount;
      }
    });
    
    return Object.entries(categoryData).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2))
    }));
  };

  const monthlyData = getMonthlyData();
  const categoryData = getCategoryData();

  const COLORS = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#34495e'];

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Financial Overview</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '30px',
        marginTop: '20px'
      }}>
        {/* Income vs Expenses Line Chart */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Income vs Expenses Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#2ecc71" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#e74c3c" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown Pie Chart */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300} >
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default FinancialCharts;