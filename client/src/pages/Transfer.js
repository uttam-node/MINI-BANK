import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { v4 as uuidv4 } from 'uuid';

const Transfer = () => {
    const [toUserEmail, setToUserEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            const idempotencyKey = uuidv4();
            await api.post('/transfer', { toUserEmail, amount: Number(amount), idempotencyKey });
            alert('Transfer successful');
        } catch (err) {
            setError(err.response?.data?.message || 'Transfer failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-6 space-y-4">
            <h2 className="text-2xl font-bold">Transfer Funds</h2>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleTransfer} className="space-y-4">
                <input type="email" placeholder="Recipient Email" value={toUserEmail} onChange={e => setToUserEmail(e.target.value)} className="border p-2 w-full" />
                <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} className="border p-2 w-full" />
                <button className="bg-green-600 text-white px-4 py-2 rounded">Send</button>
            </form>

            <div className="space-x-4 mt-4">
                <button onClick={() => navigate('/')} className="bg-gray-700 text-white px-4 py-2 rounded">Back to Wallet</button>
                <button onClick={() => navigate('/feed')} className="bg-blue-600 text-white px-4 py-2 rounded">Go to Live Feed</button>
            </div>
        </div>
    );
};

export default Transfer;
