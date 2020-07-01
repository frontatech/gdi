import React, { createContext, useEffect, useState, useReducer } from 'react'
import { MemberReducer } from 'admin/reducers/MemberReducer'
import Axios from 'axios'


const initialState = {
    members: [],
    totalMembers: 0
}
export const MembersContext = createContext()
export const MembersProvider = props => {
    const [state, dispatch] = useReducer(MemberReducer, initialState)
    useEffect(() => {
        Axios.get('/members').then(res =>{
            console.log(res)
            dispatch({type: "MEMBERS",payload:{members:res.data.members,totalMembers: res.data.total}})
        }).catch(error =>{
        })
        return () => {}
    }, [])
    // const loadMoreMembers = (e) =>{
    //     e.preventDefault()
    //     setBtnText('Loading...')
    //     const lastId = members.slice(-1)[0].post_id
    //     axios.post('/loadMoreMembers',{lastId}).then(res =>{
    //         setBtnText('Load More Members')
    //         console.log(res)
    //         if(res.data.members.length < 60) {
    //             setBtnText('No More Members')
    //             setLoadMoreBtn(false)
    //         }
    //         setMembers(posts => [...members,...res.data.members])
    //     }).catch(error =>{
    //         console.log(error)
    //     })
    // }
    return (
        <MembersContext.Provider value={{memberState:state,dispatch}}>
            {props.children}
        </MembersContext.Provider>
    )
}

