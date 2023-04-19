import axios from "axios";

export const getCartByUserId = async (id, accessToken) => {
    try {
        
        const response = await axios.get(`/api/cart/user/${id}`, 
            {
                headers: 
                    { 
                        'Authorization': `Bearer ${accessToken}`
                    },
            }
        )
        // console.log(response)
        
        return response.data
            
                        
    } catch (error) {
        console.log(error)
    }
  }
export const countCartByUserId = async (id, accessToken) => {
    // if (!id) return
    try {
        
        const response = await axios.get(`/api/cart/user/count/${id}`,
            {
                headers: 
                    { 
                        'Authorization': `Bearer ${accessToken}`
                    },
            }
        )
        // console.log(response)
        
        return response.data
            
                        
    } catch (error) {
        console.log(error)
    }
  }

export const clearCartByUserId = async (id, accessToken) => {
    try {
        
        const response = await axios.delete(`/api/cart/user/${id}`,
            {
                headers: 
                    { 
                        'Authorization': `Bearer ${accessToken}`
                    },
            }
        )
        // console.log(response)
        
        return response
            
                        
    } catch (error) {
        console.log(error)
    }
  }

export const deleteCartById = async (id, accessToken) => {
    try {
        
        const response = await axios.delete(`/api/cart/${id}`,
            {
                headers: 
                    { 
                        'Authorization': `Bearer ${accessToken}`
                    },
            }
        )
        // console.log(response)
        
        return response
            
                        
    } catch (error) {
        console.log(error)
    }
  }

export const addToCart = async(data, accessToken) => {
    try {
        const response = await axios.post("/api/cart", data,
        {
            headers: 
                { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            withCredentials: true
        }
        )
        
        return response
        
    } catch (error) {
        console.log(error)
        return error.response
    }
}

export const updateCart = async(data, accessToken) => {
    try {
        const response = await axios.patch("/api/cart", data,
        {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true,
        }
        )
        
        return response
        
    } catch (error) {
        console.log(error)
        return error.response
    }
}