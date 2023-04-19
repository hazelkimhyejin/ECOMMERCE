import axios from "axios";

export const login = async (data) => {
    try {
        
        const response = await axios.post("/api/user/login", data,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        )
        return response
                       
    } catch (error) {
        console.log(error)
        return error.response
    }
}

export const signup = async (data) => {
    try {
        const response = await axios.post("/api/user/signup", data,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        )
        
        return response
                       
    } catch (error) {
        console.log(error)
        return error.response
    }
}

export const updateUser = async (data) => {
    try {
        const response = await axios.post("/api/user/update", data,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        )
        // console.log(response)
        
        return response               
    
    } catch (error) {
        console.log(error)
        return error.response
    }
}

export const updatePassword = async (data) => {
    try {
        const response = await axios.post("/api/user/updatepw", data,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        )
        // console.log(response)
        
        return response                     
    
    } catch (error) {
        console.log(error)
        return error.response
    }
}

export const refreshToken = async () => {
    try {
        const response = await axios.get("/api/user/refresh",
        {
            withCredentials: true
        }
        )
        console.log(response)
        return response 
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    try {
        const response = await axios.get("/api/user/logout",
        {
            withCredentials: true
        }
        )
        // console.log(response)
        return response 
    } catch (error) {
        console.log(error)
    }
}

export const forgotPassword = async (data) => {
    try {
        const response = await axios.post("/api/user/forgot", data,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        )
        // console.log(response)
        return response 
    } catch (error) {
        console.log(error)
    }
}

export const verifyOTP = async (data) => {
    try {
        const response = await axios.post("/api/user/verifyotp", data,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        )
        // console.log(response)
        return response 
    } catch (error) {
        console.log(error)
        return error
    }
}

export const resetPassword = async (data, accessToken) => {
    try {
        const response = await axios.post("/api/user/auth/resetpw", data,
        {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}` 
            },
            withCredentials: true
        }
        )
        // console.log(response)
        
        return response                     
    
    } catch (error) {
        console.log(error)
        return error.response
    }
}