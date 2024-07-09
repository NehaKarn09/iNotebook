import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});

    let navigate=useNavigate();

    const {name,email,password}=credentials;

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name,email,password}) 
          });
          const json =await response.json();
          console.log(json);

          if(json.success){
            //Save the authtoken and redirect to home page
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("Created Account Succesfully","success");
          }
          else{
            props.showAlert("Invalid Details","danger");
          }
    }
  return (
    <div className="container mt-3">
      <h2>Create an account to use SkyScript</h2>
      <form className="my-4" onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label" required>Name</label>
    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label" required>Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  );
}

export default Signup;