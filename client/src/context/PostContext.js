import React,{createContext,useState,useEffect} from 'react'
import axios from 'axios'

export const PostContext = createContext()

export const PostProvider = props =>{
    const [showPost, setPost] = useState([])
    const [posts, setPosts] = useState([])
    const [showLoadBtn, setLoadBtn] = useState(true)
    const [showBtnText, setBtnText] = useState('Load More Posts')
    const [totalPosts, setTotalPosts] = useState(0)
    useEffect(() => {
        axios.get('/posts').then(res =>{
            console.log(res)
            setPosts(res.data.posts)
            setTotalPosts(res.data.total)
        }).catch(error =>{
            console.log(error)
        })
    }, [])
    const loadMorePosts = (e) =>{
        e.preventDefault()
        setBtnText('Loading...')
        const lastId = posts.slice(-1)[0].post_id
        axios.post('/loadMorePosts',{lastId}).then(res =>{
            setBtnText('Load More Posts')
            if(res.data.length < 12) {
                setBtnText('No More Posts')
                setLoadBtn(false)
            }
            setPosts(posts => [...posts,...res.data])
        }).catch(error =>{
            console.log(error)
        })
    }
    const getPost = (path,history, slug) =>{
        const singlePost = posts.filter(post => post.post_slug === slug)
        if(singlePost.length === 0){
            axios.get(path).then(res =>{
                if(res.data.length === 0 || res.data.error)return history.push('/404')
                setPost(res.data.post)
              }).catch(error =>{
                console.log(error)
              })
        }
        else{
            setPost(singlePost)
        }
    }
    return(
        <PostContext.Provider value={{showPost,getPost,posts,showLoadBtn,totalPosts,showBtnText,loadMorePosts}}>
            {props.children}
        </PostContext.Provider>
    )
}