import React, { createContext, useReducer, useEffect } from 'react'
import AdminEventReducer from 'admin/reducers/AdminEventReducer'
import { EVENTS } from 'admin/actions/actions'
import Axios from 'axios'
const initialState = {
    events: [],
    totalEvents: 0
}
export const AdminEventContext = createContext()
export const AdminEventProvider = props => {
    const [eventState, dispatch] = useReducer(AdminEventReducer, initialState)
    useEffect(() => {
        Axios.get('/allEvents').then(res =>{
            console.log(res)
            dispatch({type: EVENTS,payload:{events:res.data.events,totalEvents: res.data.total}})
        }).catch(error =>{
            console.log(error)
        })
        return () => {}
    }, [])
    return (
        <AdminEventContext.Provider value={{eventState,dispatch}}>
            {props.children}
        </AdminEventContext.Provider>
    )
}

