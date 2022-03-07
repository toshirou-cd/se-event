import React from 'react'
import { useGoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const SideBar = (props) => {
  const {items, routerPath,title} = props
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
    <div >
  <div  class="absolute top-0 left-0 flex flex-col h-full w-full md:w-64  text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data="{ open: false }">
    <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between ">
      <a href="#" class="text-sm font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">{title} </a>
      <button class="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline">
        <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
          <path x-show="!open" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
          <path x-show="open" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>
    <nav class="{'block': open, 'hidden': !open}" class="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
      {items.map(item => (
          <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg 
          dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white 
          dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 
          hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href={`${routerPath}/${item.path}`} key={item.title}>{item.title} </a>
      ))}
      
      {/* <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Portfolio</a>
      <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">About</a>
      <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Contact</a> */}
      
    </nav>
  </div>
  <div className="absolute px-4 top-0 h-14 border-b-slate-50 border-2 w-full z-0  flex justify-end py-2">
      <div class="flex justify-center items-center p-2">
          NGUYEN HOANG ANH
      </div>
      <button class="flex justify-center items-center p-2 bg-white rounded-sm"
            onClick={signOut}>
          LOG OUT
      </button>
  </div>
</div>
  )
}

export default SideBar