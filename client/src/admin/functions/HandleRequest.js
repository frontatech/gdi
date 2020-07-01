import React,{useEffect} from 'react'
import axios from 'axios'
const HandleRequest = Comp => {
    function CheckRequest  (props){
        useEffect(() => {
            axios.interceptors.response.use(response =>{
                return response
            }, error =>{
                console.log(error)
                return Promise.reject(error)
            })
            return () => {
            }
        }, [])
        return (<Comp {...props} />)
    }
    return CheckRequest    
}

export default HandleRequest
