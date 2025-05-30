import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));
describe('Login Page', () => {
    test('renders login form', () => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </AuthProvider>
        );

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    test('shows error on invalid submit', async () => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </AuthProvider>
        );

        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'invalid@user.com' }
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: 'wrongpass' }
        });

        fireEvent.click(screen.getByText(/login/i));

    });
});
