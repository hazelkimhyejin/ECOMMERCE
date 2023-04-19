import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import Login from '../src/pages/Login'
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";

describe("Login component", () => {
    it('renders', async () => {        

        renderWithQueryClientBrowserRouter(<Login />)           
        
        await waitFor(() => {
          const signupLink = screen.getAllByRole('link');
          expect(signupLink[0]).toHaveTextContent(/Don't have an account/)
        })        
    })
})