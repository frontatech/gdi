
export const UserReducer = (state,action) =>{
    switch (action.type) {
        case 'LOGIN_USER':
            return {...state,isAuthenticated:true,user:{...action.user}}
        case 'LOGOUT':
            return {...state,isAuthenticated:false,user:{}}    
        default:
            return state;
    }
}