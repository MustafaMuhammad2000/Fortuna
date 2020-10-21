import {createContext} from 'react'

export const AuthContext = createContext({
                                        isloggedIn: false, 
                                        userId: null,
                                        monthlylimit: null,
                                        token: null,
                                        login: () => {}, 
                                        logout: () => {} });