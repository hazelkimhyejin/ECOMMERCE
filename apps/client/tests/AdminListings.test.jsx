import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import AdminListings from "../src/pages/AdminListings";
import { server, rest } from './setup/server';

describe("AdminListings component", () => {
    it('renders Add Category button', async () => {
        renderWithQueryClientBrowserRouter(<AdminListings />)
        
        await waitFor(() => {
            expect(screen.getByRole('button', { name: "Add Category" })).toBeInTheDocument()
        })
    })
    it('renders mock data', async () => {

        renderWithQueryClientBrowserRouter(<AdminListings />)
        
        await waitFor(() => {
          const category = screen.getByText(/Health & Beauty/)
          expect(category).toBeInTheDocument()
        }) 
    })    
    it('handles server error', async () => {
        server.resetHandlers(
            rest.get(
                'http://localhost:3000/api/category',
                (req, res, ctx) => {
                return res(ctx.status(400));
                },
            ),
        );

        renderWithQueryClientBrowserRouter(<AdminListings />)
        
        await waitFor(() => {
            const message = screen.getByText(/Server error/)
            expect(message).toBeInTheDocument()
        }) 
    })    
})