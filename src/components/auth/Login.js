import React, { useState } from 'react'
import './Login.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { auth,provider,provider1 } from "../../firebase";
const Login = () => {

  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
    
  const handleLogin = (e)=>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password).then((auth)=>{
      console.log(auth)
    }).catch((e)=> alert(e.message))
    setPassword("");
    setEmail("");
  }
  const handleRegister = (e)=>{
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email,password).then((auth)=>{
      if(auth){
        console.log(auth)
      }
      
    }).catch((e)=> alert(e.message));
    setPassword("");
    setEmail("");
  }
  const signIn=()=>{
    auth.signInWithPopup(provider).catch((e)=>{
      alert(e.message);

    })
    console.log(auth);
  }
  const signInFacebook=()=>{
    auth.signInWithPopup(provider1).catch((e)=>{
      alert(e.message);

    })
    console.log(auth);
  }

return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img
            src="favicon.ico"
            alt="deco"
          />
        </div>
        <div className="login__desc">
          <p>A place where people get their answers.Designed for humans not for machines.</p>
          <p style={{ color: "royalblue", fontSize: "25px" }}>
            {" "}
          </p>
        </div>
        <div className="login__auth">
          <div className="login__authOptions">
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                alt=""
              />
              <p onClick={signIn}>Continue With Google</p>
            </div>
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png"
                alt=""
              />
              <span onClick={signInFacebook}>Continue With Facebook</span>
            </div>
            <div className="login__authDesc">
              <p>
                <span style={{ color: "red", cursor: "pointer" }}>
                  Sign Up With Email
                </span>
                . By continuing you indicate that you have read and agree to
                Quora's
                <span style={{ color: "red", cursor: "pointer" }}>
                  Terms of Service{" "}
                </span>
                and{" "}
                <span style={{ color: "red", cursor: "pointer" }}>
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
          <div className="login__emailPass">
            <div className="login__label">
              <h4>Login</h4>
            </div>
            <div className="login__inputFields">
              <div className="login__inputField">
                <input
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="login__inputField">
                <input
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login__forgButt">
              <small>Forgot Password?</small>
              <button type='submit' onClick={handleLogin}>Login</button>
            </div>
            <button onClick={handleRegister} >Register</button>
          </div>
        </div>
        <div className="login__lang">
          <p><a href="https://rjtportfolio.netlify.app/" target='blank'>Designed and devloped by Rajat Tripathi</a></p>
          <ArrowForwardIosIcon fontSize="small" />
        </div>
        <div className="login__footer">
          <p>About</p>
          <p>Languages</p>
          <p>Careers</p>
          <p>Businesses</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>Contact</p>
          <p>&copy; Quora Clone. 2023</p>
        </div>
      </div>
    </div>
  );
}

export default Login;