import { ADMIN_USERS } from "admin/actions/actions";
import { ADD_ADMIN } from "admin/actions/actions";
import { BLOCK_ADMIN } from "admin/actions/actions";
import { UNBLOCK_ADMIN } from "admin/actions/actions";
import { DELETE_ADMIN } from "admin/actions/actions";
import { EDIT_ADMIN } from "admin/actions/actions";


export const AdminUserReducer = (state, action) =>{
    switch (action.type) {
        case ADMIN_USERS:
            return {...state,...action.payload}
        case ADD_ADMIN:
            return {...state, admins: [...state.admins,...action.payload], totalAdmins: state.totalAdmins + 1}
        case BLOCK_ADMIN: 
            console.log(action.payload)
            const admins = state.admins.map(admin => (admin.id === action.payload.id ? {...admin,status:action.payload.status} : admin))
            return {...state,...admins}
        case EDIT_ADMIN:
            console.log(action.payload)
            const adminUsers = state.admins.map(admin => (admin.id === action.payload.id ? {...admin,role:action.payload.role} : admin))
            return {...state,admins: adminUsers}
        case DELETE_ADMIN:
            const members = state.admins.filter(admin => admin.id !== action.payload.id )
            return {...state,admins:members,totalAdmins: state.totalAdmins - 1}
        default:
            return state;
    }
}
