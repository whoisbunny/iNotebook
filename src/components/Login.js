import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = (props) => {
  let histry = useHistory();
  const[cred , setCred] = useState({email: "", password: ""})
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const respone = await fetch(`http://127.0.0.1:5000/api/auth/login`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({email:cred.email , password:cred.password})
  })
  const json = await respone.json()
  console.log(json);
  if(json.success  ) {
    // redirect to home page
    localStorage.setItem('token',json.authtoken);
    
    props.showalert("Log in Successfully" , "success")
    histry.push(`/`)

  }
  else{
     props.showalert("Invalid Details" , "danger")

  }

  }
  const onchange = async (e)=>{
    setCred({...cred, [e.target.name]:e.target.value});
  }
  return (
    <div>
      <div className="container my-3">
        <h3 className="text-center">Log In </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={cred.email}
            onChange={onchange}
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={cred.password}
            onChange={onchange}
            name="password"

          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
