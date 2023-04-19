import { createWrapper } from "./setup/renderFunctions";
import { renderHook, waitFor, act } from '@testing-library/react';
import useClearCart from '../src/hooks/useClearCart';
import { server, rest } from './setup/server';

describe("useClearCart hook", () => {
    it("Checkouts and clears cart successfully", async () => {
        const { result } = renderHook(() => useClearCart(), {
            wrapper: createWrapper(),
        });
        
        act(() => {
            result.current.mutate(12345);
        });

        await waitFor(() => {
            result.current.success;
            expect(result.current.success).toBe(true);
        });
        
    })
    it("Fails to clear cart", async () => {
        
        const { result } = renderHook(() => useClearCart(), {
            wrapper: createWrapper(),
        });
        server.resetHandlers(
            rest.delete(
                'http://localhost:3000/api/cart/user/12345',
                (req, res, ctx) => {
                return res(ctx.status(400));
                },
            ),
        );
        act(() => {
            result.current.mutate(12345);
        });

        await waitFor(() => {
            result.current.success;
            expect(result.current.success).toBe(false);
        });
        
    })
})