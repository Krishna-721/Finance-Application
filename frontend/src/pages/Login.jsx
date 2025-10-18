import { useState} from "react";
import {useAuth} from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'

function Login(){
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password:'',
        full_name:''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {login, register}=useAuth();
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError('');
        setLoading(true);
    
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
                navigate('/dashboard');
            } else {
                await register(formData);
                setIsLogin(true);
                setError('Registration successful! Please login.');
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };
    return(
        <div style={{alignItems: 'center',placeItems:'center',maxWidth:'400px',margin:'50px auto', padding:'50px'}}>
            <h2>{isLogin ? "Login" : "Register"}</h2>

            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div style={{marginBottom:'20px'}}>
                        <label>Full Name: </label>
                        <input
                        type = 'text'
                        name = "full_name"
                        value= {formData.full_name}
                        onChange={handleChange}
                        required={!isLogin}
                        style={{width:'500px', padding:'200px', marginTop:'10px', alignItems: 'center'}}
                        />
                    </div>
                )}
                <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {error && <p style={{ color: error.includes('successful') ? 'green' : 'red' }}>{error}</p>}

        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '10px', backgroundColor: '#167ff0ff', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}
          style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default Login;
