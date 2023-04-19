import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientMemoryRouter } from "./setup/renderFunctions";
import AdminOrders from "../src/pages/AdminOrders";

describe("AdminOrders component", () => {
    it('renders Product Orders title', async () => {
        renderWithQueryClientMemoryRouter(
            <AdminOrders />,
            '/api/order/admin/product/12345',
            '/api/order/admin/product/:id'
        )
        
        await waitFor(() => {
            expect(screen.getByText(/Product Orders/)).toBeInTheDocument()
        })
    })
    it('renders mock data', async () => {

        renderWithQueryClientMemoryRouter(
            <AdminOrders />,
            '/api/order/admin/product/12345',
            '/api/order/admin/product/:id'
        )
        
        await waitFor(() => {
          const product = screen.getAllByText(/Kinohimitsu Bird's Nest With Collagen/)
          expect(product[0]).toBeInTheDocument()
        }) 
    }) 
    it('handles error 400', async () => {

        renderWithQueryClientMemoryRouter(
            <AdminOrders />,
            '/api/order/admin/product/sadcase',
            '/api/order/admin/product/:id'
        )
        
        await waitFor(() => {
          const message = screen.getByText(/Server error/)
          expect(message).toBeInTheDocument()
        }) 
    })     
})