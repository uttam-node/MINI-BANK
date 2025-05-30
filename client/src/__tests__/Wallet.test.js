import { render, screen, waitFor } from "@testing-library/react";
import Wallet from "../pages/Wallet";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import api from "../api/axios";

jest.mock("../api/axios");
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));
describe("Wallet Page", () => {
    test("shows wallet balance", async () => {
        api.get.mockResolvedValue({ data: { balance: 2000 } });

        render(
            <AuthProvider>
                <BrowserRouter>
                    <Wallet />
                </BrowserRouter>
            </AuthProvider>
        );

        await waitFor(() => expect(screen.getByText(/₹2000/)).toBeInTheDocument());
    });
});
