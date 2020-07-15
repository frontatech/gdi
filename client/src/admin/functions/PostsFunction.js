
export const UpdatePost = (state,data) =>{
    const post_id = parseInt(data.post_id)
    let posts = state.posts
    posts = posts.map(post => post.post_id === post_id ? {...post,...data, post_id} : post)
    console.log(posts)
    return {...state,posts}
}
export const DeletePost = (state, post_id) =>{
    post_id = parseInt(post_id)
    let posts = state.posts
    posts = posts.filter(post => post.post_id !== post_id)
    return {...state,totalPosts:state.totalPosts - 1,posts}
}
