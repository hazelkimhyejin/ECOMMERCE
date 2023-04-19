import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import Cart from "../src/pages/Cart";
import { server, rest } from "./setup/server";

describe("Cart component", () => {
    it('renders mock data', async () => {
        renderWithQueryClientBrowserRouter(<Cart />)
        
        await waitFor(() => {
            expect(screen.getByText(/Fried Whole Chicken/)).toBeInTheDocument()
        })
    })
    it('renders Checkout button', async () => {

        renderWithQueryClientBrowserRouter(<Cart />)
        
        await waitFor(() => {
          const buttons = screen.getAllByRole('button')
          expect(buttons[0]).toHaveTextContent(/Checkout/)
        }) 
    }) 
    it('handles error 400', async () => {
        server.resetHandlers(
            rest.get(
                'http://localhost:3000/api/cart/user/undefined',
                (req, res, ctx) => {
                return res(ctx.status(400));
                },
            ),
        );
        renderWithQueryClientBrowserRouter(<Cart />)
        
        await waitFor(() => {
            expect(screen.getByText(/Server error/)).toBeInTheDocument()
        })
    })
})