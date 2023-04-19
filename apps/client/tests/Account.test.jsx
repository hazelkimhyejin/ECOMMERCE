import { describe, expect, it } from "vitest";
import { screen } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import Account from '../src/pages/Account';

describe("Account component", () => {
    it('renders greeting', () => {
        renderWithQueryClientBrowserRouter(<Account />)
        expect(screen.getByText(/Hello/)).toBeInTheDocument()
    })
    it('renders Orders button', () => {
        renderWithQueryClientBrowserRouter(<Account />)
        expect(screen.getByRole('button', { name: "My Orders" })).toBeInTheDocument()
    })
    it('renders Update Details button', () => {
        renderWithQueryClientBrowserRouter(<Account />)
        expect(screen.getByRole('button', { name: "Update Account Details" })).toHaveClass('my-2')
    })
})

