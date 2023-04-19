import { describe, expect, it } from "vitest";
import { screen } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import ResetPassword from '../src/pages/ResetPassword';

describe("ResetPassword component", () => {
    it('renders update button', () => {
        renderWithQueryClientBrowserRouter(<ResetPassword />)

        expect(screen.getByRole('button', { name: "Update" })).toBeInTheDocument()
    })
    it('renders title', () => {
        renderWithQueryClientBrowserRouter(<ResetPassword />)

        expect(screen.getByText(/Reset Password/)).toBeInTheDocument()
    })
})