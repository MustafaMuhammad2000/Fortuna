import {createContext} from 'react'

export const AuthContext = createContext({
                                        isloggedIn: false, 
                                        userId: null,
                                        token: null,
                                        login: () => {}, 
                                        logout: () => {} });