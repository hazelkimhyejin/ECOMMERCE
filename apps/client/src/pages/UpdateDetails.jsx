import { useForm } from "react-hook-form";
import useGroupBuyStore from "../store/store";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { updateUser } from "../api/user";
import { useNavigate, Link } from "react-router-dom";
import useToastSuccess from "../hooks/useToastSuccess";
import useToastError from "../hooks/useToastError";

const UpdateDetails = () => {

  const authDetails = useGroupBuyStore((state) => state.authDetails)
  const setAuthDetails = useGroupBuyStore((state) => state.setAuthDetails)
  const [ oldMobile ] = useState(authDetails.mobile.toString())
  const [ oldName ] = useState(authDetails.name)
  const [ accessToken ] = useState(authDetails.accessToken)
  const [ name, setName ] = useState(authDetails.name)
  const [ mobile, setMobile ] = useState(authDetails.mobile)
  const [ error, setError ] = useState("") 
  const [ password, setPassword ] = useState("")

  const navigate = useNavigate()

  const mutation = useMutation(formData => updateUser(formData), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response.status === 200) {
          useToastSuccess('User details updated')
          setPassword("")
          setAuthDetails({...response.data, accessToken})
          navigate("/account")
      } else {
          setError(response.data.message)
        }
      },
    })

  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = async (formData) => {
    
    if (formData.name === oldName && formData.mobile === oldMobile) {
           
      useToastError('Error: no change to details')
      return
    }
    const data = {...formData, oldMobile: oldMobile}

    mutation.mutate(data)
    
  }
 
  useEffect(() => {
    setError("")
  }, [name, mobile, password])
  
  // console.log(authDetails)
  return (
    <>
    <div className="text-sm breadcrumbs">
      <ul>
        <li><Link to="/account">Account</Link></li> 
        <li>Update Details</li>        
      </ul>
    </div> 
            
    <div className="text-2xl mb-2">Update Account Details</div>

    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)} className="form-control">
      <div className="flex flex-col items-center">

      <label className="input-group flex flex-col items-center my-3">
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="Name" value={name} {...register("name", 
        { required: true, onChange: (e) => setName(e.target.value), maxLength: 30 },)} 
        className="input input-bordered w-full max-w-xs"/>
      </label>

      <label className="input-group flex flex-col items-center my-3">
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="Mobile" value={mobile} {...register("mobile", { 
        required: true, pattern: /^[0-9]*$/i, minLength: 8, maxLength: 8,
          onChange: (e) => setMobile(e.target.value) })} 
        className="input input-bordered w-full max-w-xs"/>
      </label>

      
      <label className="input-group flex flex-col items-center my-3">
      {/* include validation with required or other standard HTML validation rules */}
      <input type="password" autoComplete="off" placeholder="Confirm Password" value={password} {...register("password", 
        { required: true, onChange: (e) => setPassword(e.target.value) })} 
        className="input input-bordered w-full max-w-xs"/>
      {/* errors will return when field validation fails  */}      
      </label>

      <div className="my-4">
        {errors.name?.type === 'required' && <span>Name is required</span>}

        {Boolean(errors.name) || errors.mobile?.type === 'required' && <span>Mobile number is required</span>}
        {Boolean(errors.name) || errors.mobile?.type === 'minLength' && <span>Mobile number is 8 digits only</span>}
        {Boolean(errors.name) || errors.mobile?.type === 'maxLength' && <span>Mobile number is 8 digits only</span>}
        {Boolean(errors.name) || errors.mobile?.type === 'pattern' && <span>Mobile number only</span>}  

        {Boolean(errors.name) || Boolean(errors.mobile) || errors.password?.type === 'required' && <span>Password is required</span>}
             
      </div>

      <div className="my-1">{error}</div>
      {mutation.isLoading && <div>Updating...</div>} 
      
      <button className="btn btn-primary btn-wide" type="submit">Update</button>
      </div>
    </form>

        
    </>
  );
  
}

export default UpdateDetails

