import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientMemoryRouter } from "./setup/renderFunctions";
import Product from "../src/pages/Product";

describe("Product component", () => {
    it('renders product', async () => {
        renderWithQueryClientMemoryRouter(
            <Product />, 
            '/api/product/12345',
            '/api/product/:id'
        )
        
        await waitFor(() => {
            expect(screen.getByText(/Valencia Orange/)).toBeInTheDocument()
        })
    })
    it('renders category', async () => {
        renderWithQueryClientMemoryRouter(
            <Product />, 
            '/api/product/12345',
            '/api/product/:id'
        )
        
        await waitFor(() => {
            expect(screen.getByText(/Fruits/)).toBeInTheDocument()
        })
    })
    it('handles error 400', async () => {
        renderWithQueryClientMemoryRouter(
            <Product />, 
            '/api/product/sadcase',
            '/api/product/:id'
        )
        
        await waitFor(() => {
            expect(screen.getByText(/Server error/)).toBeInTheDocument()
        })
    })
})