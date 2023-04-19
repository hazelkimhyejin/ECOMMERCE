import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import Orders from "../src/pages/Orders";
import { server, rest } from './setup/server';

describe("Orders component", () => {
    it('renders mock data', async () => {
        renderWithQueryClientBrowserRouter(<Orders />)
        
        await waitFor(() => {
            expect(screen.getByText(/Valencia Orange/)).toBeInTheDocument()
        })
    })
    it('renders 4 cards', async () => {
        renderWithQueryClientBrowserRouter(<Orders />)
        
        await waitFor(() => {
            const cards = screen.getAllByRole('figure')
            expect(cards).toHaveLength(6)
        })
    })
    it('renders title', async () => {
        renderWithQueryClientBrowserRouter(<Orders />)
        
        await waitFor(() => {
            const text = screen.getAllByText(/Orders/)
            expect(text).toHaveLength(2)
        })
    })
    it('handles error 400', async () => {
        server.resetHandlers(
          rest.get(
              'http://localhost:3000/api/order/user/undefined',
              (req, res, ctx) => {
              return res(ctx.status(400));
              },
          ),
        );
        renderWithQueryClientBrowserRouter(<Orders />)
        
        await waitFor(() => {
          const message = screen.getByText(/Server error/)
          expect(message).toBeInTheDocument()
        }) 
    })    
})