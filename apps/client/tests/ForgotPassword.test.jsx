import { describe, expect, it } from "vitest";
import { screen } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import ForgotPassword from '../src/pages/ForgotPassword';

describe("Account component", () => {
    it('renders text', () => {
        renderWithQueryClientBrowserRouter(<ForgotPassword />)
        expect(screen.getByText(/Enter your mobile number/)).toBeInTheDocument()
    })
})