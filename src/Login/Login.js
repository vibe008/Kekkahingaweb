import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
// import { apiUri } from "../AppUri/Appuri";

function Login() {
  const navigation= useNavigate()
  const [email, setEmail] = useState("");

  const handleLogin = async()=>{
    if(email !== ""){
      try{
        const uri = `https://api.rascalstudioz.in/api/user/findByEmail/${email}`
        const resp = await fetch(uri)
        const data =  await resp.json()
        // console.log("data",data.id)
        // console.log("resp.status",resp.status)
        if(resp.status === 200){
          navigation('/Payment',{ state: { userId: data.id } });
        }
        else{
          alert("invalid email please check you email id")
        }
      }
      catch(err){
        alert("invalid email please check you email id")
      //  console.log(err)
      }
    }
else{
  alert("Please Enter Valid email")
}
  }
  return (
    <div className="logincomponent">
      <div className="innerLoginComonent">
        <p className="loginpara">Login</p>
        <div className="emailcontainer">
          <input className="logininput"
            placeholder="Please Enter Your Email"
            value={email}
            onChange={(email) => {
              setEmail(email.target.value);
            }}
          />
          <button onClick={handleLogin} className="loginbtn">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
