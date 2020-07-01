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

const AddPost = ({history}) => {
  const editor = useRef(null)
    const config = {
        readonly: false,
        uploader:{
            insertImageAsBase64URI: true
        }
    }
    // post variables
    const [postTitle, setPostTitle] = useState('')
    const [postAuthor, setPostAuthor] = useState('')
    const [postDescript, setPostDescript] = useState('')
    const [postContent, setPostContent] = useState('') 
    const [postCat, setPostCat] = useState('')
    const [postType, setPostType] = useState('')
    const [postTags, setPostTags] = useState('')
    const [postBg, setPostBg] = useState([])
    // error variables
    const [titleError, setTitleError] = useState('')
    const [authorError, setAuthorError] = useState('')
    const [descriptError, setDescriptError] = useState('')
    const [contentError, setContentError] = useState('')
    const [catError, setCatError] = useState('')
    const [tagError, setTagError] = useState('')
    const [postBgError, setPostBgError] = useState('')
    const [postTypeError, setTypeError] = useState('')
    const [loader, setLoader] = useState(false)
    // event functions
    const handleAuthorChange = (e) =>{
        setAuthorError('')
        setPostAuthor(e.target.value)
    }
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
    const handleImageUpload = e =>{
        setPostBgError('')
        setPostBg(e.target.files)
    }
    const resetFormInputs = () =>{
        setPostAuthor('')
        setPostContent('')
        setPostTitle('')
        setPostDescript('')
        setPostTags('')
        setPostBgError('')
    }

    const handleSubmit = e =>{
        e.preventDefault()
        let isError = false;
        
        // if(postAuthor === "") {
        //     setAuthorError("Enter Post Author")
        //     isError = true;
        // }
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
        // if(postType === "" || postType === "Select Post Type") {
        //     setTypeError("Please Select Post Type")
        //     isError = true;
        // }
        if(postTags === "") {
            setTagError("Please Enter Post Tags")
            isError = true;
        }
        // if(postCat === "" || postCat === "Select Category") {
        //     setCatError("Please Select Post Category")
        //     isError = true;
        // }
        if(postBg.length === 0) {
            setPostBgError("Please Select Post Background Image")
            isError = true;
        }
        if(!isError){
            setLoader(true)
            // postContent = "hello world"
            const formData = new FormData()
            formData.append('fileToUpload', postBg[0])
            formData.append('postAuthor', 'GDI')
            formData.append('postTitle', postTitle)
            formData.append('postCat', 'General')
            formData.append('postDescript', postDescript)
            formData.append('postTags', postTags)
            formData.append('postType', 'General')
            formData.append('postContent', postContent)
           console.log('passed validation')
           axios.post('/addpost',formData, {withCredentials: true, headers:{
            'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin':"*"
                }}).then(res =>{
                    console.log('im here')
                    console.log(res)
                    const data =  res.data 
                    setLoader(false)
                    if(data.postStatus){
                        // RESET POST FORM
                        resetFormInputs()
                        return setContentError(data.message)
                    }
                }).catch(error =>{
                  setLoader(false)
                  console.log(error)
                  setContentError("An error occurred, make sure you enter all the required fields and try again")
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
                      <h3 className="text-center">Create New Post</h3>
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
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Post Background Image
                            </label>
                            <Input
                              className="form-control"
                              style={{position: 'inherit',opacity: 1}}
                              type="file" accept="image/*" onChange={handleImageUpload} id="postBg"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{postBgError}</p>
                          <br />
                        </Col>
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
                                    Add Post
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

export default AddPost;
