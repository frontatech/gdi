import { LOADMOREMEMBERS , MEMBERS} from "admin/actions/actions";
import { UPDATE_MEMBER_INFORMATION } from "admin/actions/actions";
import { UpdateMemberInformation } from "admin/functions/MemberFunctions";

export const MemberReducer = (state, action) =>{
    switch (action.type) {
        case LOADMOREMEMBERS:
            return {...state}
        case MEMBERS:
            return {...state,...action.payload}
        case UPDATE_MEMBER_INFORMATION:
            return UpdateMemberInformation(state,action.payload)
        default:
            return state;
    }
}