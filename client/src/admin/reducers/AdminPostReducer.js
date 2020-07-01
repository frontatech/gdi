import { POSTS } from "admin/actions/actions";
import { UPDATE_POST } from "admin/actions/actions";
import { UpdatePost } from "admin/functions/PostsFunction";

export const AdminPostsReducer = (state, action) =>{
    switch (action.type) {
        case POSTS:
            return {...state, ...action.payload}
        case UPDATE_POST:
            return UpdatePost(state,action.payload)
        default:
            return state;
    }
}