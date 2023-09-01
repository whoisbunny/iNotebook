import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Singup = (props) => {
  let histry = useHistory();
  const[cred , setCred] = useState({name:"" , email: "", password: "" , cpassword: ""});
  const handleSubmit = async (e)=>{
    const {name , email , password } = cred;
    e.preventDefault();
    const respone = await fetch(`http://127.0.0.1:5000/api/auth/createuser`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({name,email , password  })
  })
  const json = await respone.json()
  console.log(json);
  if(json.success  ) {
    // redirect to home page
    localStorage.setItem('token',json.authtoken)
    histry.push(`/`)
    props.showalert("Account created Successfully" , "success")

  }
  else{
    props.showalert("Invalid credentials" , "danger")
  }

  }
  const onChange = async (e)=>{
    setCred({...cred, [e.target.name]:e.target.value});
  }


  return (
    <div>
      <div className="container my-3">
      <h3 className="text-center">Sign Up </h3>
      </div>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name"  name='name'  onChange={onChange}/>
  </div>
  
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' onChange={onChange} />
  </div>
  
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password"  className="form-control" id="password" name='password' onChange={onChange}minLength={5} required/>
  </div>
  

  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange}minLength={5} required/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Singup
