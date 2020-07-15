/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useRef, useContext, useEffect, useState } from "react";
import {Link} from 'react-router-dom'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Badge,
  Container,
  Row,
  Col,
  CardFooter
} from "reactstrap";
// core components
import GeneralHeader from "../../Headers/GeneralHeader.js";
import Axios from "axios";
import { AdminPostsContext } from "admin/context/AdminPostsContext.js";
import { UPDATE_POST } from "admin/actions/actions.js";
import { GET_COMMENT, LOAD_MORE_COMMENTS } from "admin/actions/actions.js";
import AdminPostComments from "./AdminPostComments.js";
import { DELETE_COMMENT } from "admin/actions/actions.js";


const AdminPostDetails = ({location:{state:{post}}}) => {
  const {postState:{posts,postComments}, dispatch} = useContext(AdminPostsContext)
  const [currentPostComments, setCurrentPostComments] = useState([])
  let commentCounter = useRef(0)
  let currentPostCommentRef = useRef([])
  let postIdRef = useRef(0)
    const photoRef = useRef(null)
    const photoRefUrl = useRef(null)
    console.log(postComments)
    useEffect(() => {
      postIdRef = post.post_id
      const post_id = post.post_id
      const filterComments = postComments.filter(c => c.post_id === `post${post.post_id}`)
      console.log(filterComments)
      if(filterComments.length === 0){
        let type = "first"
        let comment_id = 0
        Axios.get(`/admin/comments/?post_id=${post_id}&type=${type}&comment_id=${comment_id}`).then(res =>{
            if(res.data){
              console.log(res.data.comments)
              setCurrentPostComments(res.data.comments)
              dispatch({type: GET_COMMENT, payload: [{post_id,comments:res.data.comments}]})
            }
        }).catch(error =>{

        })
      }
      else{
        setCurrentPostComments(filterComments[0].comments)
      }
      return () => {
        
      }
    }, [])
    const openGallery = e =>{
        e.preventDefault()
        photoRef.current.click()
    }
    const handleFileChange = e =>{
        const photo = e.target.files
        if(photo.length !== 0){
            const photoUrl = URL.createObjectURL(photo[0])
            photoRefUrl.current.src = photoUrl
            const formData = new FormData()
            formData.append('fileToUpload',photo[0])
            formData.append('oldPostBg',post.post_bg)
            formData.append('post_id',post.post_id)
            Axios.post('/updatePostBg', formData).then(res =>{
                console.log(res)
                if(!res.data.isError){
                    dispatch({type: UPDATE_POST,payload:res.data.post})
                }
            }).catch(error =>{
                console.log(error)
            })
        }
        
    }
    const displayPost = content =>{
        return{__html: content}
    }
    const loadMoreComments =  async(e,getPost) =>{
      e.preventDefault()
      const post_id = getPost.post_id
      const comment_id = currentPostComments.slice(-1)[0].comment_id
      const type = "more"
      try {
        const res = await Axios.get(`/admin/comments/?post_id=${post_id}&type=${type}&comment_id=${comment_id}`)
        if(res.data){
          console.log(res.data.comments)
          setCurrentPostComments(previousComments => ([...previousComments, ...res.data.comments]))
          dispatch({type: LOAD_MORE_COMMENTS, payload: {post_id,comments:res.data.comments}})
        }
      } catch (error) {
        console.log(error)
      }
    }
    const handleCommentDelete = async (e, comment) =>{
      const comment_id = comment.comment_id
      alert(comment_id)
      try {
        const res = await Axios.delete(`/admin/comment/${comment.post_id}/${comment_id}`)
        console.log(res)
        if(res.data.success){
          setCurrentPostComments(previousComments => previousComments.filter(comment => comment.comment_id !== comment_id))
          dispatch({type: DELETE_COMMENT, payload: {comment_id:res.data.comment_id, post_id: comment.post_id}})
        }
      } catch (error) {
        console.log(error)
      }
    }
    return (
      <>
        <GeneralHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col xl="12">
              <Card className="bg-white shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Post Details</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="bg-white">
                  <h5 className="heading">{post.post_title}</h5>
                  <h6 className="description">{post.post_descript}</h6>
                  <div>
                    <div style={{height: 400}}>
                      <div style={{maxHeight:500,height: 400}} className="mb-5">
                      <img style={{height: '100%'}} className="rounded w-100" ref={photoRefUrl} src={post.post_bg} />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                            <Form>
                                <input
                                    className="form-control-alternative"
                                    id="input-photo"
                                    placeholder="surname"
                                    type="file"
                                    hidden
                                    ref={photoRef}
                                    onChange={handleFileChange}
                                />
                            </Form>
                            <Button
                            className="float-right"
                            color="default"
                            size="sm"
                            onClick={openGallery}
                            >
                            <i className="fa fa-camera" />
                            </Button>
                      </div>
                  </div>
                  <div className="mb-3">

                  </div><br/>
                  <div dangerouslySetInnerHTML={displayPost(post.post_content)} />
                  <div>Posted by: {post.post_author}</div>
                  <div>Posted on: {post.post_date}</div>
                  <div>Total comments: {post.post_comments}</div>
                  <div>Total views: {post.post_views}</div>
                  {/* showing available comments */}
                  <div className="d-block text-center">
                    {post.post_comments !== 0 ? <AdminPostComments comments={currentPostComments} handleCommentDelete={handleCommentDelete} />: <h4>No Comments found</h4>}
                    {post.post_comments > currentPostComments.length ? <Button color="warning" onClick={e => loadMoreComments(e,post)}>View {post.post_comments - currentPostComments.length} Comments</Button> : null}
                  </div>
                </CardBody>
                <CardFooter className="bg-white">
                    <h4 className="heading">Tags</h4>
                      {
                        post.post_tags.split(',').map(item => <Badge key={item} color="info" className="btn btn-rounded"><Link className="text-white" to={"/posts/"+item}>#{item.trim()}</Link></Badge>)
                      }
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
}

export default AdminPostDetails;
