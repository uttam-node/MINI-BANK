import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <div className="space-x-4">
                {token && (
                    <>
                        <Link to="/">Wallet</Link>
                        <Link to="/transfer">Transfer</Link>
                        <Link to="/feed">Live Feed</Link>
                    </>
                )}
            </div>
            <div>
                {!token ? (
                    <>
                        <Link to="/login" className="mr-4">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className="text-red-400">Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
