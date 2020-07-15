import React, { createContext, useReducer} from 'react'
import  jwt from 'jwt-decode'
import { UserReducer } from '../reducers/UserReducer'
import { getAuthToken, isEmpty } from '../functions/UserFunctions'
import { LOG_OUT } from 'admin/actions/actions'

const initialState = {
    user:{},
    isAuthenticated: false
}
export const UserAuthContext = createContext()
export const UserAuthProvider = (props) => {
    const [user, dispatch] = useReducer(UserReducer,initialState, () =>{
        const userAuthToken = getAuthToken('idgLocalToken')
        console.log(userAuthToken)
        if(userAuthToken === null) return initialState
        const data = jwt(userAuthToken)
        if(isEmpty(data)){
            dispatch({type: LOG_OUT, payload:{}})
        }
        return {...initialState,user:data,isAuthenticated:true}
    })   
    return (
        <UserAuthContext.Provider value={{user, dispatch}}>
            {props.children}
        </UserAuthContext.Provider>
    )
}

