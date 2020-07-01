import React, { createContext, useEffect, useReducer } from 'react'
import Axios from 'axios'
import { AdminPostsReducer } from 'admin/reducers/AdminPostReducer'
import { POSTS } from 'admin/actions/actions'


const initialState = {
    posts: [],
    totalPosts: 0
}
export const AdminPostsContext = createContext()
export const AdminPostsProvider = props => {
    const [postState, dispatch] = useReducer(AdminPostsReducer, initialState)
    useEffect(() => {
        Axios.get('/allPosts').then(res =>{
            console.log(res)
            dispatch({type: POSTS,payload:{posts:res.data.posts,totalPosts: res.data.total}})
        }).catch(error =>{
            console.log(error)
        })
        return () => {}
    }, [])
    return (
        <AdminPostsContext.Provider value={{postState,dispatch}}>
            {props.children}
        </AdminPostsContext.Provider>
    )
}

