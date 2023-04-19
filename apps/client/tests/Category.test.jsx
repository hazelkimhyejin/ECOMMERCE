import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientMemoryRouter } from "./setup/renderFunctions";
import Category from "../src/pages/Category";

describe("Category component", () => {
    it('renders mock data', async () => {
        renderWithQueryClientMemoryRouter(
            <Category />, 
            '/api/product/cat/count/12345',
            '/api/product/cat/count/:id'
          )
        
        await waitFor(() => {
            expect(screen.getByText(/Valencia Orange/)).toBeInTheDocument()
        })
    })
    it('renders 4 cards', async () => {
        renderWithQueryClientMemoryRouter(
            <Category />, 
            '/api/product/cat/count/12345',
            '/api/product/cat/count/:id'
          )
        
        await waitFor(() => {
            const cards = screen.getAllByRole('figure')
            expect(cards).toHaveLength(4)
        })
    })
    it('handles error 400', async () => {
        renderWithQueryClientMemoryRouter(
            <Category />, 
            '/api/product/cat/count/sadcase',
            '/api/product/cat/count/:id'
          )
        
        await waitFor(() => {
            expect(screen.getByText(/Server error/)).toBeInTheDocument()
        })
    })
})