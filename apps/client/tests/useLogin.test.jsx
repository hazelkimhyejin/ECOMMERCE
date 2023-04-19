import { createWrapper } from "./setup/renderFunctions";
import { renderHook, waitFor, act } from '@testing-library/react';
import useLogin from '../src/hooks/useLogin';
import { login } from './setup/mockDataUser';
import { server, rest } from './setup/server';

describe("useLogin hook", () => {
    it("Logs in successfully", async () => {
        const { result } = renderHook(() => useLogin({setError: ()=>{}}), {
            wrapper: createWrapper(),
        });
        // server.resetHandlers(
        //     rest.post(
        //         'http://localhost:3000/api/user/login',
        //         (req, res, ctx) => {
        //         return res(ctx.status(200), ctx.json(login));
        //         },
        //     ),
        // );
        act(() => {
            result.current.mutate({
                mobile: "91234567",
                password: "password",
            });
        });

        await waitFor(() => {
            result.current.success;
            expect(result.current.success).toBe(true);
        });
        
    })
    it("Logs in unsuccessfully", async () => {
        
        const { result } = renderHook(() => useLogin({setError: ()=>{}}), {
            wrapper: createWrapper(),
        });
        server.resetHandlers(
            rest.post(
                'http://localhost:3000/api/user/login',
                (req, res, ctx) => {
                return res(ctx.status(400), ctx.json(login));
                },
            ),
        );
        act(() => {
            result.current.mutate({
                mobile: "91234567",
                password: "badpassword",
            });
        });

        await waitFor(() => {
            result.current.success;
            expect(result.current.success).toBe(false);
        });
        
    })
})