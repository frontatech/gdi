import React, { createContext,useState } from 'react'
import axios from 'axios'

export const CommentContext = createContext()

export const CommentProvider = props => {
  const [comments, setComments] = useState([])
  const [totalComments, setTotalComments] = useState(0)
  const [showBtnText, setBtnText] = useState('Load More Comments')
  const [showLoadBtn, setLoadBtn] = useState(true)
  
  const getComments = (path) =>{
    axios.get(path).then(res =>{
        console.log(res)
        if(res.data.length === 0 || res.data.error) return
        setTotalComments(res.data.totalComments)
        setComments(res.data.comments)
        const remainComments = res.data.totalComments-res.data.comments.length
        setBtnText(() => remainComments === 1 ? `Load ${remainComments} More Comment`: `Load ${remainComments} More Comments`)
      }).catch(error =>{
        console.log(error)
    })
  }
  const updateCommment = (comment) =>setComments((comments) => [...comment, ...comments])
  const loadMoreComments = (e) =>{
    e.preventDefault()
    setBtnText('Loading...')
    const lastId = comments.slice(-1)[0].comment_id
    const postId = comments.slice(-1)[0].post_id
    axios.post('/loadMoreComments',{lastId,postId}).then(res =>{
        const remainComments = totalComments - (comments.length+res.data.length)
        if(remainComments === 0){
          setLoadBtn(false)
          setBtnText('No More Comments')
        }
        setBtnText(() => remainComments === 1 ? `Load ${remainComments} More Comment`: `Load ${remainComments} More Comments`)
        setComments(posts => [...posts,...res.data])
    }).catch(error =>{
        console.log(error)
    })
}
  const contentMarkup = (e) => {
    return {__html: e};
  }
  return (
      <CommentContext.Provider value={{comments,totalComments,showLoadBtn,showBtnText,updateCommment,loadMoreComments,contentMarkup,getComments}}>
          {props.children}
      </CommentContext.Provider>
  )
}

