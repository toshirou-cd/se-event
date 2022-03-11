import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
// import { useGoogleAuth } from "../../googleAuth/googleAuth";
import {useGoogleLogin} from 'react-google-login'
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../../utils/types";
import { LoginSuccess } from "../../redux/actions/authActions";
import { authenticate, authenWGoogle } from "../../services/auth/authService";

const Login = () => {
  // const { signIn} = useGoogleAuth()
  // const {isSignedIn} = useGoogleAuth()
  const [err, setErr] = useState(false)
  const[email, setEmail] = useState()
  const[password, setPassword] = useState()
  const [user,setUser] = useState({
    email : '',
    userName : '',
    role :''
  })
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect( () => {
    if(user.email !== '') {
      dispatch(LoginSuccess(user))
      localStorage.setItem('user',JSON.stringify(user))
    }
  },[user])

  const onSuccess = (respone) => {
    console.log('success loggin :' + JSON.stringify(respone))
    if(respone.profileObj) {
        
      console.log('user : ' + user)
      authenWGoogle(respone.tokenId).then(res => {
        if(res.statusCode === 200) {
          setUser({
            email : respone.profileObj.email,
            userName : respone.profileObj.name,
            role : res.user.role
          })

          localStorage.setItem('token',res.data)
          if(res.user.role === 'User') {
            history.push('/user')
          } else if (res.user.role === 'Manager') {
            history.push('/manager')
          }
         else if (res.user.role === 'HeadManager') {
            history.push('/headManager')
          }
        } else {
          setErr(true)
        }
      })
      
      
    }
    // return <Redirect to='/user' />
  }
  const onFailure = (res) => {
    console.log('failure in  loggin :' + JSON.string(res))
  }

  const {signIn} = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId:'14536865243-pqo2h6g02uulf087dovb0bhvp56qldnd.apps.googleusercontent.com',
    // isSignedIn:true,
    redirectUri:'postmessage'
  })


  const handleSubmit =() => {
    authenticate(email,password).then((res) => {
      console.log('avda' +res )
        if(res.statusCode === 200) {
          setUser({
            email : res.user.email,
             userName :  res.user.userName,
             role : res.user.role
          })
          switch(res.user.role) {
            case 'HeadManager' : return history.push('/headmanager') 
            case 'User' : return history.push('/user') 
            case 'Admin' : return history.push('/admin') 
            case 'Manager' :  return history.push('/manager') 
          }
        } 
      }).catch((err) => {
        console.log('avda' + err )
      setErr(true)
    })
  }



  // useEffect(() => {
  //   // console.log('isSigned In : ' + isSignedIn)
  //   // if(isSignedIn) history.push('/user')
  // },[])

  return (
    <div class="bg-orange-200">
      <div class="container h-screen flex justify-center items-center">
        <div class="p-8 bg-white rounded-lg max-w-6xl pb-10">
          <div class="flex justify-center mb-4"> FPT Event For SE major </div>{" "}
          <input
            type="text"
            class="h-12 rounded w-full border px-3 focus:text-black focus:border-blue-100"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <input
            type="password"
            class="h-12 mt-3 rounded w-full border px-3 focus:text-black focus:border-blue-100"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div class="flex justify-end items-center mt-2">
            {" "}
            <a href="#" class="text-gray-400 hover:text-gray-600">
              Forgot password?
            </a>{" "}
          </div>{" "}
          <button class="uppercase h-12 mt-3 text-white w-full rounded bg-red-700 hover:bg-red-800"
            onClick={() =>handleSubmit()}
            >
            login
          </button>
          <div class="flex justify-between items-center mt-3">
            <hr class="w-full" /> <span class="p-2 text-gray-400 mb-1">OR</span>
            <hr class="w-full" />
          </div>{" "}
          <button class="uppercase h-12 mt-3 text-white w-full rounded bg-red-800 hover:bg-red-900"
            onClick={signIn}
            >
            <i class="fa fa-google mr-2"></i>login with FPT mail
          </button>
          
          { err && <div class="text-red-900 ">Your account is not valid</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
