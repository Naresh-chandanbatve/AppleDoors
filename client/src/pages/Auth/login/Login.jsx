import React, { useState } from "react";
import "../authStyle.css"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LandingFooter from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import { useAuth } from "../../../context/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth,setAuth]=useAuth();
    
    const navigate = useNavigate();
    
    
    const [isLoading, setIsLoading] = useState(false);

 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
                email,
                password,
              
               
            });
            if (res && res.data.success) {
              setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token
              });
              localStorage.setItem('auth',JSON.stringify(res.data));
                navigate("/");
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log(error);
        }
    };

  const [passwordType, setPasswordType] = useState("password");

  const passwordToggle = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <>
      <Header />
      <div className="authpage_godparent">
        <div className="authpage_parent">
          <div className="authpage_rightdiv">
            <form onSubmit={handleSubmit} className="authform">
              <h1 className="">Join Milan Today</h1>


              <div className="authform_container">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>

              <div className="authform_container">
                <input
                  type={passwordType}
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />

                <button
                  type="button"
                  onClick={passwordToggle}
                  className="toggle-button"
                >
                  {passwordType === "password" ? "Show" : "Hide"}
                </button>
              </div>

              <button
                type="submit"
                className={`authpage_submitbtn ${
                  isLoading ? "disabled" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </button>

              <button onClick={() => {navigate('/forgot-password')}}>
                Forgot Password 
              </button>
            </form>
          </div>
          <div className="authpage_leftdiv">
            <img
              src="https://milanhub.org/assets/authbannerimg-90821bd2.webp"
              alt="Auth Banner"
            />
          </div>
        </div>
      </div>
      <LandingFooter />
    </>
  );
};

export default Login;
