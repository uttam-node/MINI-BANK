import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const LiveFeed = () => {
    const [trades, setTrades] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const socket = io('http://localhost:5000');

        socket.on('trade-update', (data) => {
            setTrades(prev => [data, ...prev.slice(0, 10)]);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Live Trade Feed</h2>

            {trades.length === 0 ? (
                <p>No trades yet...</p>
            ) : (
                trades.map((trade, i) => (
                    <div key={i} className="border p-2">
                        {trade.instrument} - ₹{trade.price} x {trade.volume}
                    </div>
                ))
            )}

            <div className="space-x-4 mt-4">
                <button onClick={() => navigate('/')} className="bg-gray-700 text-white px-4 py-2 rounded">Back to Wallet</button>
                <button onClick={() => navigate('/transfer')} className="bg-green-600 text-white px-4 py-2 rounded">Go to Transfer</button>
            </div>
        </div>
    );
};

export default LiveFeed;
