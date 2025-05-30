import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Wallet from './pages/Wallet';
import Transfer from './pages/Transfer';
import LiveFeed from './pages/LiveFeed';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<PrivateRoute><Wallet /></PrivateRoute>} />
          <Route path="/transfer" element={<PrivateRoute><Transfer /></PrivateRoute>} />
          <Route path="/feed" element={<PrivateRoute><LiveFeed /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
