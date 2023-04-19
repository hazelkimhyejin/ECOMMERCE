import { useState } from "react";
import { useMutation } from "react-query";
import useToastSuccess from "../hooks/useToastSuccess";
import useToastError from "../hooks/useToastError";
import { useForm } from "react-hook-form";
import { updateProductById, updateProductListingById, deleteImageFromCloud } from "../api/product";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import useAuthDetails from "../hooks/useAuthDetails";

const AdminProductDetail = ({ imgUrl, imgUrl1, imgUrl2, imgUrl3, imgUrl4, name, productId, desc, price, listed, categoryId }) => {
  
  const [ productName, setProductName ] = useState(name)
  // const [ localImgUrl, setLocalImgUrl ] = useState(imgUrl)
  // const [ localImgUrl1, setLocalImgUrl1 ] = useState(imgUrl1)
  // const [ localImgUrl2, setLocalImgUrl2 ] = useState(imgUrl2)
  // const [ localImgUrl3, setLocalImgUrl3 ] = useState(imgUrl3)
  // const [ localImgUrl4, setLocalImgUrl4 ] = useState(imgUrl4)
  const [ productDesc, setProductDesc ] = useState(desc)
  const [ productPrice, setProductPrice ] = useState(price)
  // console.log(imgUrl.split("/").slice(-1)[0].replace('.jpg', '').replace('.png', ''))
  // const publicId = (url) => url.split("/").slice(-1)[0].replace('.jpg', '').replace('.png', '')
  const { accessToken } = useAuthDetails()
  
  const mutation = useMutation((formData) => updateProductById(formData, accessToken), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response?.status === 200) {
          
          useToastSuccess("Product updated")
            
        } else {

          useToastError("Error: Product not updated")          
        }
      },
    })

  const listingMutation = useMutation((id) => updateProductListingById(id, accessToken), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {
        console.log(response)
        if (response?.status === 200) {
          
          useToastSuccess("Listing updated")
          // navigate("/admin/updateproduct")
            
        } else {

          useToastError("Error: Product not updated")          
        }
      },
    })


  // const cloudMutation = useMutation(data => updateProductListingById(data), 
  //   {
  //     onError: (response) => {
  //       console.log(response)
  //     },
  //     onSuccess: (response) => {
  //       console.log(response)
  //       if (response?.status === 200) {
          
  //         useToastSuccess("Image deleted")
  //         // navigate("/admin/updateproduct")
            
  //       } else {

  //         useToastError("Error: Image not deleted")          
  //       }
  //     },
  //   })

    const changeListing = () => {
      
      listingMutation.mutate(productId)
    }

    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (formData) => {
      
      const convertToNull = (attr) => {
        if (attr === "null") {
          return null
        } else return attr
      }

      // console.log(formData)
      const newFormData = {
        ...formData,
        listed: listed,
        id: productId,
        imgUrl: convertToNull(document.getElementById("uploadedimage0")?.getAttribute("src")),
        imgUrl1: convertToNull(document.getElementById("uploadedimage1")?.getAttribute("src")),
        imgUrl2: convertToNull(document.getElementById("uploadedimage2")?.getAttribute("src")),
        imgUrl3: convertToNull(document.getElementById("uploadedimage3")?.getAttribute("src")),
        imgUrl4: convertToNull(document.getElementById("uploadedimage4")?.getAttribute("src"))
      }
      // console.log(newFormData)
      mutation.mutate(newFormData)
    }  

    // const replaceImageWithNext = (num) => {
    //   const replace = document.getElementById(`uploadedimage${num}`).getAttribute("src")
    //   document.getElementById(`uploadedimage${num-1}`).setAttribute("src", replace)
    //   if (replace === null) {
    //     document.getElementById(`container${num}`).classList.add("hidden")
    //     document.getElementById(`container${num-1}`).classList.add("hidden")
    //   }
    // }

  return (
    <>
        {listed && <button className="btn btn-wide mx-auto my-3" 
          onClick={changeListing}>Close Product Listing</button>}
        {!listed && <button className="btn btn-wide mx-auto my-3"
          onClick={changeListing}>Open Product Listing</button>}
        {mutation.isLoading && <div>Updating...</div>} 

        <div className="card bg-base-100 shadow-xl md:items-center">        
        <div className="mt-2 text-lg">Update Product Details</div>

        <div className="card-body">
            
        <form onSubmit={handleSubmit(onSubmit)} className="form-control">
          <div className="flex flex-col items-center">

          <label className="input-group flex flex-col items-center my-3">
          <div className="my-1">Product name</div>
          <textarea placeholder="Product name" value={productName} {...register("name", { 
            required: true, onChange: (e) => setProductName(e.target.value) })} 
            className="input input-bordered w-full max-w-xs"/>
          </label>

          {/* <label className="input-group flex flex-col items-center my-3">
          <div className="my-1">Image URL</div>
          <textarea placeholder="Image URL" value={productImgUrl} {...register("imgUrl", { 
            required: true, onChange: (e) => setProductImgUrl(e.target.value) })} 
            className="input input-bordered w-full max-w-xs"/>
          </label>

          <figure><img className="p-8" src={imgUrl} alt={name}/></figure> */}
          <CloudinaryUploadWidget />

          <div className="sm:grid sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 md:gap-6">

            <div className={`relative my-2 ${imgUrl || "hidden"} md:w-9/10`} id="container0">
            <figure><img className="p-2" id="uploadedimage0" src={imgUrl || null} alt={productName} data-publicid=""/></figure>
            {/* <div className="btn btn-sm btn-outline absolute top-6 right-6" 
              onClick={() => {
                const replace = document.getElementById("uploadedimage1").getAttribute("src")
                document.getElementById("uploadedimage0").setAttribute("src", replace)
                if (!replace) {
                  document.getElementById("container1").classList.add("hidden")
                  document.getElementById("container0").classList.add("hidden")
                }
                for (let i=1; i<5; i++) {
                  replaceImageWithNext(i)
                }              
              }}>Delete</div> */}
            </div>

            <div className={`relative my-2 ${imgUrl1 || "hidden"} md:w-9/10`} id="container1">
            <figure><img className="p-2" id="uploadedimage1" src={imgUrl1 || null} alt={productName} data-publicid=""/></figure>
            <div className="btn btn-sm btn-outline absolute top-6 right-6" 
              onClick={() => {
                // const url = document.getElementById("uploadedimage1").getAttribute("src")
                document.getElementById("uploadedimage1").setAttribute("src", null)
                document.getElementById("container1").classList.add("hidden")
                // for (let i=2; i<5; i++) {
                //   replaceImageWithNext(i)
                // } 
              }}>Delete</div>
            </div>
            <div className={`relative my-2 ${imgUrl2 || "hidden"} md:w-9/10`} id="container2">
            <figure><img className="p-2" id="uploadedimage2" src={imgUrl2 || null} alt={productName} data-publicid=""/></figure>
            <div className="btn btn-sm btn-outline absolute top-6 right-6" 
              onClick={() => {
                document.getElementById("uploadedimage2").setAttribute("src", null);
                document.getElementById("container2").classList.add("hidden");
                // for (let i=3; i<5; i++) {
                //   replaceImageWithNext(i)
                // } 
              }}>Delete</div>
            </div>
            <div className={`relative my-2 ${imgUrl3 || "hidden"} md:w-9/10`} id="container3">
            <figure><img className="p-2" id="uploadedimage3" src={imgUrl3 || null} alt={productName} data-publicid=""/></figure>
            <div className="btn btn-sm btn-outline absolute top-6 right-6" 
              onClick={() => {
                document.getElementById("uploadedimage3").setAttribute("src", null);
                document.getElementById("container3").classList.add("hidden");
                // for (let i=4; i<5; i++) {
                //   replaceImageWithNext(i)
                // } 
              }}>Delete</div>
            </div>
            <div className={`relative my-2 ${imgUrl4 || "hidden"} md:w-9/10`} id="container4">
            <figure><img className="p-2" id="uploadedimage4" src={imgUrl4 || null} alt={productName} data-publicid=""/></figure>
            <div className="btn btn-sm btn-outline absolute top-6 right-6" 
              onClick={() => {
                document.getElementById("uploadedimage4").setAttribute("src", null);
                document.getElementById("container4").classList.add("hidden");
              }}>Delete</div>
            </div>
            
          </div>
          {/* <div className={`relative my-2 ${imgUrl4 || "hidden"}`}>
          <figure><img className="p-2" id="uploadedimage0" src={imgUrl4 || null} alt={productName} data-publicid=""/></figure>
          <button className="btn btn-sm btn-outline absolute top-6 right-6" 
            onClick={() => document.getElementById("uploadedimage4").setAttribute("src", null)}>Delete</button>
          </div> */}
          
          {/* <figure><img className={`p-8 ${imgUrl4 || "hidden"}`} id="uploadedimage4" src={imgUrl4 || null} alt={productName} data-publicid=""/></figure> */}

          <label className="input-group flex flex-col items-center my-3">
          <div className="my-1">Description</div>
          <textarea placeholder="Product description" value={productDesc} {...register("desc", { 
            required: true, onChange: (e) => setProductDesc(e.target.value) })} 
            className="input input-bordered w-full max-w-xs"/>
          </label>

          <label className="input-group flex flex-col items-center my-3">
          <div className="my-1">Price</div>
          <input type="number" placeholder="Price" value={productPrice} {...register("price", { 
            required: true, valueAsNumber: true, onChange: (e) => setProductPrice(e.target.value) })} 
            className="input input-bordered w-full max-w-xs"/>
          </label>
          
          <div className="my-4">
            {errors.name?.type === 'required' && <span>Product name is required</span>}

            {/* {Boolean(errors.name) || errors.imgUrl?.type === 'required' && <span>Image URL is required</span>} */}
            
            {Boolean(errors.name) || errors.desc?.type === 'required' && <span>Description is required</span>}
             
            {Boolean(errors.name) || Boolean(errors.desc) || errors.price?.type === 'required' && <span>Price is required</span>}        
            {Boolean(errors.name) || Boolean(errors.desc) || errors.price?.type === 'valueAsNumber' && <span>Price must be a number</span>}        
          </div>

          {/* <div className="my-1">{error}</div> */}
          {mutation.isLoading && <div>Updating...</div>} 
          <button className="btn btn-primary btn-wide" type="submit">Update</button>
          </div>
        </form>
        
        </div>
        </div>
        
    </>
  )
}

export default AdminProductDetail