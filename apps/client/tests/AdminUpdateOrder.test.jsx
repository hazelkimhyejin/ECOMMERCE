import { describe, expect, it } from "vitest";
import { screen, waitFor, fireEvent } from '@testing-library/react';
import { renderWithQueryClientMemoryRouter } from "./setup/renderFunctions";
import AdminUpdateOrder from "../src/pages/AdminUpdateOrder";

describe("AdminUpdateOrder component", () => {
    it('renders order id text', async () => {
        renderWithQueryClientMemoryRouter(
            <AdminUpdateOrder />,
            '/api/order/admin/admin/12345',
            '/api/order/admin/admin/:id'
        )
        
        await waitFor(() => {
            expect(screen.getByText(/Order id/)).toBeInTheDocument()
        })
    })
    it('renders mock data', async () => {
        renderWithQueryClientMemoryRouter(
            <AdminUpdateOrder />,
            '/api/order/admin/admin/12345',
            '/api/order/admin/admin/:id'
        )
        
        await waitFor(() => {
            const product = screen.getAllByText(/Kinohimitsu Bird's Nest With Collagen/)
            expect(product).toHaveLength(2)
        })
    })
    it('renders Payment pending button', async () => {

        renderWithQueryClientMemoryRouter(
            <AdminUpdateOrder />,
            '/api/order/admin/admin/12345',
            '/api/order/admin/admin/:id'
        )
        
        await waitFor(() => {
          const buttons = screen.getAllByRole('button')
          console.log(buttons)
          expect(buttons[0]).toHaveTextContent(/Payment pending/)
        }) 
    })  
    it('handles error 400', async () => {

        renderWithQueryClientMemoryRouter(
            <AdminUpdateOrder />,
            '/api/order/admin/product/sadcase',
            '/api/order/admin/product/:id'
        )
        
        await waitFor(() => {
          const message = screen.getByText(/Server error/)
          expect(message).toBeInTheDocument()
        }) 
    }) 
})