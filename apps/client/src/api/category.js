import axios from "axios";

export const getAllCategories = async () => {
    try {
        
        const response = await axios.get("/api/category")
        
        if (response.status === 200) return response.data
          
                           
    } catch (error) {
        console.log(error)
    } 
}     

export const getCategoryById = async (id) => {
    try {
        
        const response = await axios.get(`/api/category/${id}`)
        
        if (response.status === 200) return response.data
          
                           
    } catch (error) {
        console.log(error)
    } 
}      

