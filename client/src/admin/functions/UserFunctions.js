
import axios from 'axios'

export const LoginUser = async (user) =>{
    try {
        let response =  await axios.post('/login',user)
        return {response}
    } catch (error) {
        return {error}
    }
}

export const RegisterUser = async (user) =>{
    try {
        let response =  await axios.post('/register',user)
        return {response}
    } catch (error) {
        return {error}
    }
}
export const logoutUser = async () =>{
    try {
        let response =  await axios.post('/logout',{})
        return {response}
    } catch (error) {
        return {error}
    }
}
export const  isEmpty = (obj) =>{
    for(let item in obj) return false
    return true 
}


export const getAuthToken = (name) =>{
    let cookieArray = document.cookie.split(";");
    for (let index = 0; index < cookieArray.length; index++) {
        const cookiePair = cookieArray[index].split("=")
        if(cookiePair[0].trim() === name){
            return decodeURIComponent(cookiePair[1]);
        }   
    }
    return null

} 