import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientMemoryRouter } from "./setup/renderFunctions";
import AdminCategory from '../src/pages/AdminCategory';

describe("AdminCategory component", () => {
    it('renders Create Listing button', async () => {

        renderWithQueryClientMemoryRouter(
          <AdminCategory />, 
          '/api/product/cat/count/12345',
          '/api/product/cat/count/:id'
        )
        
        await waitFor(() => {
          const listings = screen.getByText(/Create Listing/)
          expect(listings).toBeInTheDocument()
        }) 
    })     
    it('renders mock data', async () => {

        renderWithQueryClientMemoryRouter(
          <AdminCategory />, 
          '/api/product/cat/count/12345',
          '/api/product/cat/count/:id'
        )
        
        await waitFor(() => {
          const product = screen.getByText(/Creator Expert 10280 Flower Bouquet/)
          expect(product).toBeInTheDocument()
        }) 
    })     
    it('server error 400', async () => {

        renderWithQueryClientMemoryRouter(
          <AdminCategory />, 
          '/api/product/cat/count/sadcase',
          '/api/product/cat/count/:id'
        )
        
        await waitFor(() => {
          const message = screen.getByText(/Server error/)
          expect(message).toBeInTheDocument()
        }) 
    })     
})