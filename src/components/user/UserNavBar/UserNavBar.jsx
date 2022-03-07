import React from 'react';
// import { useGoogleAuth } from '../../../googleAuth/googleAuth';
import { useGoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../redux/actions/authActions';

const UserNavBar = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const onLogoutSuccess = () => {
      console.log('log out ok ')
      dispatch(logout())
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      history.push('/login')
    }
    const onFailure = (err) => {
      console.log('log out not ok ' + err)
    }
    const { signOut, loaded } = useGoogleLogout({
      onFailure,
      clientId : '14536865243-pqo2h6g02uulf087dovb0bhvp56qldnd.apps.googleusercontent.com',
      onLogoutSuccess
    })
  return (
    <div class="flex flex-grow p-5 bg-black/75 px-3">
    <div class="basis-1/5 ml-6">FPT Event</div>
    <div class="basis-3/5 flex flex-grow justify-center space-x-12">
      <div>EVENTS</div>
      <div>RESGISTED EVENT</div>
      <div>CONTACT</div>
    </div>
    <div class="basis-1/5 mr-6 flex justify-end">
        <button onClick={signOut} >
            Log out 
        </button>
        </div>
  </div>
  )
};

export default UserNavBar;
