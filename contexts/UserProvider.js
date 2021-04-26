import { createContext, useContext } from 'react'
import useUser_ from 'hooks/useUser'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const user = useUser_()

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
