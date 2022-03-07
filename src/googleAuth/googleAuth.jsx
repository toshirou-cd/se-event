import React,{useContext, createContext} from 'react'
import { useGoogleLogin } from 'react-use-googlelogin'

const GoogleAuthContext = createContext()

export const GoogleAuthProvider = ({ children }) => {
  const googleAuth = useGoogleLogin({
    clientId: '14536865243-pqo2h6g02uulf087dovb0bhvp56qldnd.apps.googleusercontent.com', // Your clientID from Google.
  })

  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {children}
    </GoogleAuthContext.Provider>
  )
}

export const useGoogleAuth = () => useContext(GoogleAuthContext)
