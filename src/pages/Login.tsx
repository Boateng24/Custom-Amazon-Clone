import AuthLink from '@mui/material/Link';
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react';
import {auth} from '../firebase/firebase';
import {login, register} from '../slices/authSlice';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { Auth } from 'firebase/auth';



interface Inputs {
  auth: Auth;
  username: string;
  email: string;
  password: string;
}

const InitialState: Inputs = {
  auth: auth,
  username: "",
  email: "",
  password: "",
};


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [inputs, setInputs] = useState<Inputs>(InitialState);
    const [loginUser, setLoginUser] = useState<boolean>(true)


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
         setInputs({...inputs, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (loginUser){
            try {
                const userCredentials = dispatch(login(inputs))
                const user = userCredentials;
                setInputs(InitialState)
                console.log("Logged In User", user);
                navigate("/");
            } catch (error) {
                console.log('Login error', error);
                
            }
        } else {
            try {
              const userCredentials = dispatch(register(inputs))
              const user = userCredentials
              setInputs(InitialState);
              setLoginUser(true)
              console.log('Registered:', user);
              
            } catch (error) {
                console.log('Registration error', error);   
            }
        }
    }


     const resetState = () => {
       setLoginUser(true);
       setInputs(InitialState);
       console.log(inputs);
       
     };


  return (
    <div className="login ml-[590px]">
      <div className="logo">
        <Link to={"/"} className="flex justify-center">
          <img
            src="/amazon-2-logo-svgrepo-com.svg"
            alt="Amazon Logo"
            className="w-28"
          />
        </Link>
      </div>
      <div className="loginContainer w-96 h-fit rounded-md border border-gray-500 p-5">
        <h1 className="heading font-bold ml-36 mb-5 text-xl">
          {loginUser ? "Sign-In" : "Sign-Up"}
        </h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          {!loginUser && (
            <div className="usernameInputs mb-5">
              <label htmlFor="username" className="font-bold">
                Username
              </label>
              <input
                type="text"
                id="username"
                className=" w-full bg-gray-200 border border-gray-600 rounded-sm"
                value={inputs.username}
                name="username"
                onChange={handleChange}
              />
            </div>
          )}
          <div className="emailInputs mb-5">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              type="text"
              id="email"
              className=" w-full bg-gray-200 border border-gray-600 rounded-sm"
              value={inputs.email}
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="passwordInputs mb-5">
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full bg-gray-200 border border-gray-600 rounded-sm"
              value={inputs.password}
              name="password"
              onChange={handleChange}
            />
          </div>

          <button type='submit' className="w-full mt-6 mb-5 bg-[#f0c14b] rounded-sm h-10 border border-gray-600">
            {loginUser ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-xs">
            {loginUser
              ? "By Signing in you agree to the CUSTOM AMAZON CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our interest based Ads Notice"
              : "By Signing in you agree to the CUSTOM AMAZON CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our interest based Ads Notice"}
          </p>

          {loginUser ? (
            <>
              {" "}
              <p className='text-sm mt-2'>Not registered yet?</p>
              <AuthLink onClick={() => setLoginUser(false)}>
                <button className="w-full border border-gray-600 mt-5 h-8 bg-slate-200">
                  Create your Amazon Account
                </button>
              </AuthLink>
            </>
          ) : (
            <>
              <p>Already Registered?</p>
              <AuthLink onClick={resetState}>
                <button className="w-full border border-gray-600 mt-5 h-8 bg-slate-200">
                  Sign in to your Amazon Account
                </button>
              </AuthLink>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
