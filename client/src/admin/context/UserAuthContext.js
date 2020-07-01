import React, { createContext, useReducer} from 'react'
import  jwt from 'jwt-decode'
import { UserReducer } from '../reducers/UserReducer'
import { getAuthToken, isEmpty } from '../functions/UserFunctions'

const initialState = {
    user:{},
    isAuthenticated: false
}
export const UserAuthContext = createContext()
export const UserAuthProvider = (props) => {
    const [user, dispatch] = useReducer(UserReducer,initialState, () =>{
        const userAuthToken = getAuthToken('authLocalToken')
        console.log(userAuthToken)
        if(userAuthToken === null) return initialState
        const data = jwt(userAuthToken)
        if(isEmpty(data)) return initialState
        console.log(data.exp-Math.round((new Date().getTime())/1000))
        if(Math.round((new Date().getTime())/1000) > data.exp){
            document.cookie = "authLocalToken= ; expires=Thu, 18 Dec 2012 12:00:00: UTC; path=/"
            // document.cookie = "authLocalToken=; max-age=0; path=/"
            return initialState
        }
        
        return {...initialState,user:data,isAuthenticated:true}
    })   
    return (
        <UserAuthContext.Provider value={{user, dispatch}}>
            {props.children}
        </UserAuthContext.Provider>
    )
}

