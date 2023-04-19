import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientMemoryRouter } from "./setup/renderFunctions";
import Order from "../src/pages/Order";

describe("Order component", () => {
    it('renders mock data', async () => {
        renderWithQueryClientMemoryRouter(
            <Order />, 
            '/api/order/12345',
            '/api/order/:id'
          )
        
        await waitFor(() => {
            expect(screen.getByText(/Valencia Orange/)).toBeInTheDocument()
        })
    })
    it('renders title', async () => {
        renderWithQueryClientMemoryRouter(
            <Order />, 
            '/api/order/12345',
            '/api/order/:id'
          )
        
        await waitFor(() => {
            expect(screen.getByText(/Order Detail/)).toBeInTheDocument()
        })
    })
    it('handles error 400', async () => {
        renderWithQueryClientMemoryRouter(
            <Order />, 
            '/api/order/sadcase',
            '/api/order/:id'
          )
        
        await waitFor(() => {
            expect(screen.getByText(/Server error/)).toBeInTheDocument()
        })
    })
})