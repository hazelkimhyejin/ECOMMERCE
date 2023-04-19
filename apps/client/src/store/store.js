import create from 'zustand';
import { devtools } from 'zustand/middleware';

const useGroupBuyStore = create(
    devtools((set) => ({
        
        // errorStatus: 400,
        // errorStatusText: "",
        // setError: (data) => set({ errorStatus: data.status, errorStatusText: data.statusText}),

        authDetails: {},
        setAuthDetails: (data) => set({ authDetails: data}),

    }))
)

export default useGroupBuyStore



