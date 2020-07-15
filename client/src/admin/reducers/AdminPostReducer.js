import { POSTS } from "admin/actions/actions";
import { UPDATE_POST } from "admin/actions/actions";
import { UpdatePost, DeletePost } from "admin/functions/PostsFunction";
import { DELETE_POST } from "admin/actions/actions";
import { ADD_POST } from "admin/actions/actions";
import { LOAD_MORE_POSTS } from "admin/actions/actions";
import { GET_COMMENT, LOAD_MORE_COMMENTS } from "admin/actions/actions";
import { DELETE_COMMENT } from "admin/actions/actions";

export const AdminPostsReducer = (state, action) =>{
    switch (action.type) {
        case POSTS:
            return {...state, ...action.payload}
        case ADD_POST:
            return {...state, posts:[...state.posts,...action.payload], totalPosts:state.totalPosts + 1}
        case LOAD_MORE_POSTS:
            return {...state, posts:[...state.posts,...action.payload]}
        case UPDATE_POST:
            return UpdatePost(state,action.payload)
        case DELETE_POST:
            return DeletePost(state, action.payload)
        case GET_COMMENT:
            return {...state, postComments: [...action.payload]}
        case LOAD_MORE_COMMENTS:
            const currentPostComments = state.postComments.filter(comment => comment.post_id === action.payload.post_id)
            console.log(currentPostComments)
            const comments = currentPostComments[0].comments
            return {...state, postComments:state.postComments.map(comment => comment.post_id === action.payload.post_id ? {...comment, comments: [...comments, ...action.payload.comments ] }: comment)}
        case DELETE_COMMENT:
            console.log(action.payload) 
            console.log(state.postComments)
            const currentComments = state.postComments.filter(comment => comment.post_id === parseInt(action.payload.post_id))[0].comments
            console.log(currentComments)
            const postComments = currentComments.filter(comment => comment.comment_id !== parseInt(action.payload.comment_id))
            return {...state, postComments}
        default:
            return state;
    }
}