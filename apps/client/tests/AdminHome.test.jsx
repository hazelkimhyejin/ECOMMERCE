import { describe, expect, it } from "vitest";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import AdminHome from '../src/pages/AdminHome';

describe("AdminHome component", () => {
    it('renders greeting', () => {
        render(<AdminHome />, {wrapper: BrowserRouter})
        expect(screen.getByText(/Admin Home/)).toBeInTheDocument()
    })
    it('renders View Listings button', () => {
        render(<AdminHome />, {wrapper: BrowserRouter})
        // screen.debug()
        expect(screen.getByRole('button', { name: "View Listings" })).toBeInTheDocument()
    })    
})