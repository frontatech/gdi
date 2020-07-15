import { LOG_OUT } from "admin/actions/actions";
import { LOGIN_USER } from "admin/actions/actions";

export const UserReducer = (state,action) =>{
    switch (action.type) {
        case LOGIN_USER:
            console.log(action.payload)
            return {...state,user:{...action.payload},isAuthenticated:true}
        case LOG_OUT:
            return {...state,isAuthenticated:false,user:{}}    
        default:
            return state;
    }
}