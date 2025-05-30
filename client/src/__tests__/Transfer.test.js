import { render, screen, fireEvent } from '@testing-library/react';
import Transfer from '../pages/Transfer';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import api from '../api/axios';
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));
jest.mock('../api/axios');

describe('Transfer Page', () => {
    test('can enter recipient and amount', () => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <Transfer />
                </BrowserRouter>
            </AuthProvider>
        );

        fireEvent.change(screen.getByPlaceholderText(/recipient email/i), {
            target: { value: 'user@example.com' }
        });

        fireEvent.change(screen.getByPlaceholderText(/amount/i), {
            target: { value: '150' }
        });

        expect(screen.getByDisplayValue('user@example.com')).toBeInTheDocument();
        expect(screen.getByDisplayValue('150')).toBeInTheDocument();
    });
});
