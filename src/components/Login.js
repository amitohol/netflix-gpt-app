import React, { useState, useRef } from "react";
import Header  from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm, setIsSignForm] = useState(true);
  const [errrorMessage, setErrrorMessage] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {    
    const message = checkValidData(email.current.value, password.current.value);    
    setErrrorMessage(message)
    if(message) return;
    // Sign In / Sign Up
    if(!isSignInForm){
        // Sign Up Logic
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          // Update User Profile 
            updateProfile(user, {
              displayName: name.current.value, photoURL: "https://cdn-icons-png.flaticon.com/512/219/219983.png"
            }).then(() => {
              // again storing wth updated value in store
              const {uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL})); 
              navigate("/browse")
            }).catch((error) => {
              // An error occurred
            });    
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrrorMessage(errorCode + "-" + errorMessage);
        });
    }else{
        // Sign In Logic
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigate("/browse");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrrorMessage(errorCode + "-" + errorMessage);
          });
    }

  }
  const toggleSignInForm = () => {
    setIsSignForm(!isSignInForm)
  };
  return (
    <div>
      <Header/>  
        <div className="absolute">
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_large.jpg"
            srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_large.jpg 2000w, 
                    https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_medium.jpg 1279w, 
                    https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_small.jpg 959w"
            alt="background"
            aria-hidden="true"
            className="default-ltr-cache-19j6xtr"        
          />
        </div>
        <form onSubmit={(e) => e.preventDefault()}className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
          <h1 className="font-bold font-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          {!isSignInForm && (
            <input type="text" ref={name} placeholder="Full Name" className="p-4 my-4 w-full bg-gray-600"/>
          )}
          <input type="text" ref={email} placeholder="Email Address" className="p-4 my-4 w-full bg-gray-600"/>
          <input type="password" ref={password} placeholder="Password" className="p-4 my-4 w-full bg-gray-600"/>
          <p className="text-red-500 py-3">{errrorMessage}</p>
          <button className="p-4 my-4 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now.."}</p>
        </form>
      </div>
  );
};

export default Login;
