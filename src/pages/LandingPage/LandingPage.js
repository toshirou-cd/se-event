import React from "react";
import "./LandingPage.css";
import { useHistory } from 'react-router-dom'
// import { useGoogleAuth } from "../../googleAuth/googleAuth";
import UserNavBar from "../../components/user/UserNavBar/UserNavBar";
import { useGoogleLogout } from "react-google-login";

const LandingPage = () => {

    const onLogoutSuccess = (res) => {
      console.log('log out success')
      localStorage.setItem('isSignedIn',false)
    }
    const onFailure =() => {
      console.log('log out fail')
    }


    const {signOut} = useGoogleLogout({
      clientId : '14536865243-pqo2h6g02uulf087dovb0bhvp56qldnd.apps.googleusercontent.com',
      onLogoutSuccess,
      onFailure,
    })
  

  return (
    <div >
    </div>
  );
};

export default LandingPage;
