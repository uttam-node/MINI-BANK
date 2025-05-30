import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    useEffect(() => {
        console.log("token", token)
        if (token && token != null) {
            const fetchBalance = async () => {
                const res = await api.get('/wallet');
                console.log("res", res)
                if (res?.data?.balance) setBalance(res.data.balance);
                else navigate('/login');

            };
            fetchBalance();
        } else navigate('/login')
    }, []);

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Wallet Balance</h2>
            <p className="text-xl">₹{balance.toFixed(2)}</p>

            <div className="space-x-4">
                <button onClick={() => navigate('/transfer')} className="bg-green-600 text-white px-4 py-2 rounded">
                    Go to Transfer
                </button>
                <button onClick={() => navigate('/feed')} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Go to Live Feed
                </button>
            </div>
        </div>
    );
};

export default Wallet;
