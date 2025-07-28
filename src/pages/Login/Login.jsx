import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login,signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

  const [sign,Setsign] = useState("Sign In")
  const [name,SetName] = useState("")
  const [email,SetEmail] = useState("")
  const [password,SetPassword] = useState("")
  const [loading,SetLoading] = useState(false);

  const user_auth = async (event) =>{
    event.preventDefault();
    SetLoading(true);
    if(sign==="Sign In"){
      await login(email,password);
    }else{
      await signup(name,email,password);
    }
    SetLoading(false);
  }

  return (
    loading?<div className='login-spinner'><img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo}  className='login-logo' alt="" />
      <div className="login-form">
        <h1>{sign}</h1>
        <form >
          {sign === "Sign Up" ?<input value={name} onChange={(e)=>{SetName(e.target.value)}}type="text" placeholder='Enter your name' /> : <></>}
          
          <input value={email} onChange={(e)=>{SetEmail(e.target.value)}} type="email" placeholder='Enter your Email' />
          <input value={password} onChange={(e)=>{
            SetPassword(e.target.value)}} type="password" placeholder='Password' />
          <button onClick={user_auth} type='submit'>{sign}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Help me</p>
          </div>
        </form>
        <div className="form-switch">
          {sign === "Sign In" ?<p>New to Netflix? <span onClick={()=> Setsign("Sign Up")}>Sign Up Now</span></p>:
          <p>Already have account? <span  onClick={()=> Setsign("Sign In")}>Sign In Now</span></p> }
          
          
        </div>
      </div>
    </div>
  )
}

export default Login
