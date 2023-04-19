import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { signup } from "../api/user";
import useToastSuccess from "../hooks/useToastSuccess";

const Signup = () => {
  const [error, setError] = useState("") 
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const mutation = useMutation(formData => signup(formData), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response.status === 201) {
          useToastSuccess('Account successfully created')
          navigate("/login")
        } else {
          setError(response.data.message)
        }
      },
    })

  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (formData) => {
    
    mutation.mutate(formData)
  }
  
 
  return (

    <>
    <div className="text-2xl mb-2">Sign Up</div>

    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)} className="form-control">
      <div className="flex flex-col items-center">

      <label className="input-group flex flex-col items-center my-3">
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="Name" {...register("name", { 
        required: true, maxLength: 30, onChange: () => setError("") })} 
        className="input input-bordered w-full max-w-xs"/>
      </label>

      <label className="input-group flex flex-col items-center my-3">
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="Mobile" {...register("mobile", { 
        required: true, pattern: /^[0-9]*$/i, minLength: 8, maxLength: 8, onChange: () => setError("") 
      })} 
        className="input input-bordered w-full max-w-xs"/>
      </label>

      <label className="input-group flex flex-col items-center my-3">
      {/* include validation with required or other standard HTML validation rules */}
      <input type="password" autoComplete="off" placeholder="Password" {...register("password", { 
        required: true, minLength: 5, pattern: /^[a-z0-9]+$/i, 
        onChange: (e) => {setPassword(e.target.value); setError("")}
      })} 
        className="input input-bordered w-full max-w-xs"/>
      {/* errors will return when field validation fails  */}      
      </label>

      <label className="input-group flex flex-col items-center my-3">
      {/* include validation with required or other standard HTML validation rules */}
      <input type="password" autoComplete="off" placeholder="Confirm Password" {...register("confirmPassword", { 
        validate: value => value === password, onChange: () => setError("")
      })} 
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
        {Boolean(errors.name) || Boolean(errors.mobile) || errors.password?.type === 'minLength' && <span>Password requires minimum of 5 characters</span>}
        {Boolean(errors.name) || Boolean(errors.mobile) || errors.password?.type === 'pattern' && <span>Password can only have alphanumeric characters</span>}  

        {Boolean(errors.name) || Boolean(errors.mobile) || Boolean(errors.password) || errors.confirmPassword?.type === 'validate' && <span>Passwords don't match</span>}        
      </div>

      <div className="my-1">{error}</div>
      {mutation.isLoading && <div>Signing Up...</div>} 
      <button className="btn btn-primary btn-wide" type="submit">Sign Up</button>
      </div>
    </form>

    <div className="mt-6 text-lg link">
      <a href="/login">
        Have an account? Log in.
      </a>     
    </div>
    
    </>
  );
}

export default Signup