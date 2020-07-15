import React, { createContext, useReducer, useEffect } from 'react'
import Axios from 'axios'
import { ADMIN_USERS } from 'admin/actions/actions'
import { AdminUserReducer } from 'admin/reducers/AdminUserReducer'
const initialState = {
    admins: [],
    totalAdmins: 0
}
export const AdminUsersContext = createContext()
export const AdminUsersProvider = props => {
    const [adminUsers, dispatch] = useReducer(AdminUserReducer, initialState)
    useEffect(() => {
        Axios.get('/allAdminUsers').then(res =>{
            console.log(res)
            dispatch({type: ADMIN_USERS,payload:{admins:res.data.admins,totalAdmins: res.data.total}})
        }).catch(error =>{
            console.log(error)
        })
        return () => {}
    }, [])
    return (
        <AdminUsersContext.Provider value={{adminUsers,dispatch}}>
            {props.children}
        </AdminUsersContext.Provider>
    )
}

