import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import Checkout from "../src/pages/Checkout";
import { server, rest } from "./setup/server";

describe("Checkout component", () => {
    it('renders mock data', async () => {

        renderWithQueryClientBrowserRouter(<Checkout />)
        
        await waitFor(() => {
          const item = screen.getByText(/Fried Whole Chicken/)
          expect(item).toBeInTheDocument()
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
        renderWithQueryClientBrowserRouter(<Checkout />)
        
        await waitFor(() => {
          const message = screen.getByText(/Server error/)
          expect(message).toBeInTheDocument()
        }) 
    })    
})