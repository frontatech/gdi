
export const UpdatePost = (state,data) =>{
    console.log(data)
    const post_id = parseInt(data.post_id)
    let posts = state.posts
    posts = posts.map(post => post.post_id === post_id ? {...post,...data, post_id} : post)
    console.log(posts)
    return {...state,posts}
}