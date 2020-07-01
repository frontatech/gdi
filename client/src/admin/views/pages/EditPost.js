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
import React, { Fragment, useRef, useContext, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import axios from 'axios'
import JoditEditor from "jodit-react";
import GeneralHeader from "../../Headers/GeneralHeader";
import { AdminPostsContext } from "admin/context/AdminPostsContext";
import { UPDATE_POST } from "admin/actions/actions";

const EditPost = ({location:{state:{post}}}) => {
  const {dispatch} = useContext(AdminPostsContext)
  const editor = useRef(null)
    const config = {
        readonly: false,
        uploader:{
            insertImageAsBase64URI: true
        }
    }
    // post variables
    const [postTitle, setPostTitle] = useState(post.post_title)
    const [postDescript, setPostDescript] = useState(post.post_descript)
    const [postContent, setPostContent] = useState(post.post_content) 
    const [postCat, setPostCat] = useState()
    const [postType, setPostType] = useState('')
    const [postTags, setPostTags] = useState(post.post_tags)
    // error variables
    const [titleError, setTitleError] = useState('')
    const [authorError, setAuthorError] = useState('')
    const [descriptError, setDescriptError] = useState('')
    const [contentError, setContentError] = useState('')
    const [catError, setCatError] = useState('')
    const [tagError, setTagError] = useState('')
    const [postTypeError, setTypeError] = useState('')
    const [loader, setLoader] = useState(false)
    
    const handleTitleChange = e =>{
        setTitleError('')
        setPostTitle(e.target.value)
    }
    const handleDescriptChange = e =>{
        setDescriptError('')
        setPostDescript(e.target.value)
    }
    const handleContentChange = e =>{
        setContentError('')
        setPostContent(e)   
    }
    const handleCategoryChange = e =>{
        setCatError('')
        setPostCat(e.target.value)
    }
    const handleTypeChange = e =>{
        setCatError('')
        setPostType(e.target.value)
    }
    const handleMetaChange = e =>{
        setTagError('')
        setPostTags(e.target.value)
    }
    const resetFormInputs = () =>{
        setPostContent('')
        setPostTitle('')
        setPostDescript('')
        setPostTags('')
    }

    const handleSubmit = e =>{
        e.preventDefault()
        let isError = false;
        if(postTitle === "") {
            setTitleError("Enter Post Title")
            isError = true;
        }
        if(postDescript === "") {
            setDescriptError("Enter Post Description")
            isError = true;
        }
        if(postContent === "") {
            setContentError("Enter Post Content")
            isError = true;
        }
        if(postTags === "") {
            setTagError("Please Enter Post Tags")
            isError = true;
        }
        
        if(!isError){
            setLoader(true)
            const postData ={
                postTitle,postAuthor:'GDI',postCat: 'General',postDescript,postTags,postContent,postAuthor:'GDI', postId: post.post_id
            }
            axios.post('/updatePost',postData).then(res =>{
                    console.log('im here')
                    console.log(res)
                    const data =  res.data 
                    setLoader(false)
                    setContentError(data.message)
                    if(!data.isError){
                      return dispatch({type: UPDATE_POST,payload: data.post})
                    }
                }).catch(error =>{
                  setLoader(false)
                  if(error.response){
                    let err = error.response
                    setContentError(err.data.error)
                  }
                  else if(error.request){
                    setContentError(error.message)
                  }
                  else{
                    setContentError("An error occurred, make sure you enter all the required fields and try again")
                  }
                })
            }
    }
    return (
      <Fragment>
        <GeneralHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h3 className="text-center">Update Post</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="bg-white">
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Post Title
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="postTitle"
                              placeholder="Enter post title"
                              type="text"
                              value={postTitle} onChange={handleTitleChange}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{titleError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Post Description
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={postDescript} onChange={handleDescriptChange} id="postDescript" 
                              placeholder="Post description"
                              className="form-control"
                              type="text"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{descriptError}</p>
                          <br />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Post Meta Tags
                            </label>
                            <input type="text" placeholder="Enter each separated by a spacebar" value={postTags} onChange={handleMetaChange} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{tagError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <div className="pl-lg-4">
                        <h6 className="heading-p text-muted">Post Content</h6>
                          <div className="pl-lg-4">
                            <JoditEditor
                                    ref={editor}
                                    value={postContent}
                                    config={config}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={newContent => handleContentChange(newContent)} 
                                    onChange={newContent => {}}
                            />
                          </div>
                          <br />
                        <p className="text-danger">{contentError}</p><br/>
                        {loader ? (<div className="d-block text-center">
                              <div className="spinner-border fast" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                          </div>): null}
                        
                        <div className="text-center mt-4">
                                <Button onClick={handleSubmit} color="warning" outline type="submit">
                                    Update Post
                                <i className="far fa-paper-plane" className="ml-2" />
                            </Button>
                        </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
}

export default EditPost;
