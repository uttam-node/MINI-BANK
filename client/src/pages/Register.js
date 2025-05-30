import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', { email, password });
            login(res.data.token);
            navigate('/wallet')
        } catch (err) {
            setError(err?.response?.data?.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
            <h2 className="text-2xl font-bold">Register</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full" required />
            <button className="bg-blue-600 text-white px-4 py-2">Register</button>
            <p className="text-sm">
                Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>Login</span>
            </p>
        </form>
    );
};

export default Login;
