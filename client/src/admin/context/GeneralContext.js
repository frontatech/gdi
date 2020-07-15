import React, { createContext, useReducer, useEffect } from 'react'
import Axios from 'axios'
import { GeneralReducer } from 'admin/reducers/GeneralReducer'
import { GALLERY_PHOTOS } from 'admin/actions/actions'
const initialState = {
    photoFiles: [],
    totalFiles: 0
}
export const GeneralContext = createContext()
export const GeneralProvider = props => {
    const [gdiFiles, dispatch] = useReducer(GeneralReducer, initialState)
    useEffect(() => {
        Axios.get('/photoGallery').then(res =>{
            console.log(res)
            dispatch({type: GALLERY_PHOTOS,payload:{photoFiles:res.data.photoFiles,totalFiles: res.data.total}})
        }).catch(error =>{
            console.log(error)
        })
        return () => {}
    }, [])
    return (
        <GeneralContext.Provider value={{gdiFiles,dispatch}}>
            {props.children}
        </GeneralContext.Provider>
    )
}

