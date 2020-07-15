import { LOADMOREMEMBERS , MEMBERS} from "admin/actions/actions";
import { UPDATE_MEMBER_INFORMATION, ADD_GDI_MEMBER } from "admin/actions/actions";
import { UpdateMemberInformation } from "admin/functions/MemberFunctions";

export const MemberReducer = (state, action) =>{
    switch (action.type) {
        case MEMBERS:
            return {...state,...action.payload}
        case ADD_GDI_MEMBER:
            return {...state,members:[...state.members,...action.payload],totalMembers:state.totalMembers+1}
        case LOADMOREMEMBERS:
            return {...state,members:state.members.concat(action.payload)}
        case UPDATE_MEMBER_INFORMATION:
            return UpdateMemberInformation(state,action.payload)
        default:
            return state;
    }
}