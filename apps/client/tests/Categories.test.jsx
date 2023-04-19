import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import Categories from "../src/pages/Categories";
import { server, rest } from "./setup/server";

describe("Categories component", () => {
    it('renders mock data', async () => {

        renderWithQueryClientBrowserRouter(<Categories />)
        
        await waitFor(() => {
          const category = screen.getByText(/Fruits/)
          expect(category).toBeInTheDocument()
        }) 
    })    
    it('handles error 400', async () => {
      server.resetHandlers(
          rest.get(
              'http://localhost:3000/api/category',
              (req, res, ctx) => {
              return res(ctx.status(400));
              },
          ),
      );
      renderWithQueryClientBrowserRouter(<Categories />)
      
      await waitFor(() => {
          expect(screen.getByText(/Server error/)).toBeInTheDocument()
      })
  })
})