import React, { useState, useContext } from 'react'
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
import Axios from 'axios';
import { NewsletterContext } from 'admin/context/NewsletterContext';
import { NEWSLETTER_THEME } from 'admin/actions/actions';
const NestedColTemplate = () => {
  const {dispatch} = useContext(NewsletterContext)
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [postOneImage, setPostOneImage] = useState('')
  const [postOneContent, setPostOneContent] = useState('')
  const [postOneUrl, setPostOneUrl] = useState('')
  const [postTwoImage, setPostTwoImage] = useState('')
  const [postTwoDescription, setPostTwoDescription] = useState('')
  const [postTwoUrl, setPostTwoUrl] = useState('')
  const [postThreeImage, setPostThreeImage] = useState('')
  const [postThreeDescript, setPostThreeDescript] = useState('')
  const [postThreeUrl, setPostThreeUrl] = useState('')
  const [postFourImage, setPostFourImage] = useState('')
  const [postFourDescript, setPostFourDescript] = useState('')
  const [postFourUrl, setPostFourUrl] = useState('')
  const [postFiveImage, setPostFiveImage] = useState('')
  const [postFiveDescript, setPostFiveDescript] = useState('')
  const [postFiveUrl, setPostFiveUrl] = useState('')
  const [postSixImage, setPostSixImage] = useState('')
  const [postSixDescript, setPostSixDescript] = useState('')
  const [postSixUrl, setPostSixUrl] = useState('')
  const [postSevenImage, setPostSevenImage] = useState('')
  const [postSevenDescript, setPostSevenDescript] = useState('')
  const [postSevenUrl, setPostSevenUrl] = useState('')
  // loader 
  const [loader, setLoader] = useState(false)
  const [message, setMessage] = useState('')
  // errors
  const [subjectError, setSubjectError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [postOneImageError, setPostOneImageError] = useState('')
  const [postOneContentError, setPostOneContentError] = useState('')
  const [postOneUrlError, setPostOneUrlError] = useState('')
  const [postTwoImageError, setPostTwoImageError] = useState('')
  const [postTwoDescriptionError, setPostTwoDescriptionError] = useState('')
  const [postTwoUrlError, setPostTwoUrlError] = useState('')
  const [postThreeImageError, setPostThreeImageError] = useState('')
  const [postThreeDescriptError, setPostThreeDescriptError] = useState('')
  const [postThreeUrlError, setPostThreeUrlError] = useState('')
  const [postFourImageError, setPostFourImageError] = useState('')
  const [postFourDescriptError, setPostFourDescriptError] = useState('')
  const [postFourUrlError, setPostFourUrlError] = useState('')
  const [postFiveImageError, setPostFiveImageError] = useState('')
  const [postFiveDescriptError, setPostFiveDescriptError] = useState('')
  const [postFiveUrlError, setPostFiveUrlError] = useState('')
  const [postSixImageError, setPostSixImageError] = useState('')
  const [postSixDescriptError, setPostSixDescriptError] = useState('')
  const [postSixUrlError, setPostSixUrlError] = useState('')
  const [postSevenImageError, setPostSevenImageError] = useState('')
  const [postSevenDescriptError, setPostSevenDescriptError] = useState('')
  const [postSevenUrlError, setPostSevenUrlError] = useState('')
  
  // events
  const handleSubjectChange = e =>{
    setSubject(e.target.value)
    setSubjectError('')
  }
  const handleDescriptChange = e =>{
    setDescription(e.target.value)
    setDescriptionError('')
  }
  
  const handlePostOneImage = e =>{
      setPostOneImage(e.target.value)
      setPostOneImageError('')
  }
  const handlePostOneUrl = e =>{
      setPostOneUrl(e.target.value)
      setPostOneUrlError('')
  }
  const handlePostOneContent = e =>{
      setPostOneContent(e.target.value)
      setPostOneContentError('')
  }
  const handlePostTwoImage = e =>{
      setPostTwoImage(e.target.value)
      setPostTwoImageError('')
  }
  const handlePostTwoDescription = e =>{
      setPostTwoDescription(e.target.value)
      setPostTwoDescriptionError('')
  }
  const handlePostTwoUrl = e =>{
      setPostTwoUrl(e.target.value)
      setPostTwoUrlError('')
  }
  const handlePostThreeImage =  e =>{
      setPostThreeImage(e.target.value)
      setPostThreeImageError('')
  }  
  const handlePostThreeDescript = e =>{
      setPostThreeDescript(e.target.value)
      setPostThreeDescriptError('')
  }
  const handlePostThreeUrl = e =>{
      setPostThreeUrl(e.target.value)
      setPostThreeUrlError('')
  }
  const handlePostFourImage = e =>{
      setPostFourImage(e.target.value)
      setPostFourImageError('')
  }
  const handlePostFourDescript = e =>{
      setPostFourDescript(e.target.value)
      setPostFourDescriptError('')
  }
  const handlePostFourUrl = e =>{
      setPostFourUrl(e.target.value)
      setPostFourUrlError('')
  }
  const handlePostFiveImage = e =>{
      setPostFiveImage(e.target.value)
      setPostFiveImageError('')
  }
  const handlePostFiveDescript = e =>{
      setPostFiveDescript(e.target.value)
      setPostFiveDescriptError('')
  }
  const handlePostFiveUrl = e =>{
      setPostFiveUrl(e.target.value)
      setPostFiveUrlError('')
  }
  
  const handlePostSixImage = e =>{
      setPostSixImage(e.target.value)
      setPostSixImageError('')
  }
  const handlePostSixDescript = e =>{
      setPostSixDescript(e.target.value)
      setPostSixDescriptError('')
  }
  const handlePostSixUrl = e =>{
      setPostSixUrl(e.target.value)
      setPostSixUrlError('')
  }
  const handlePostSevenImage = e =>{
      setPostSevenImage(e.target.value)
      setPostSevenImageError('') 
  }
  const handlePostSevenDescript = e =>{
      setPostSevenDescript(e.target.value)
      setPostSevenDescriptError('')
  }
  const handlePostSevenUrl = e =>{
      setPostSevenUrl(e.target.value)
      setPostSevenUrlError('')
  }
  // handling submit
  const handleSubmit = e =>{
    e.preventDefault()
    let isError = false
    if(subject === ""){
      isError = true
      setSubjectError("Please enter newletter title")
    }
    if(description === ""){
      isError = true
      setDescriptionError("Please enter newletter caption")
    }
    if(postOneImage === ""){
        isError = true
        setPostOneImageError("Please enter post image url")
    }
    if(postOneContent === ""){
        isError = true
        setPostOneContentError("Please enter post content")
    }
    if(postOneUrl === ""){
        isError = true
        setPostOneUrlError("Please enter post one url")
    }
    if(postTwoImage === ""){
        isError = true
        setPostTwoImageError("please enter post image url")
    }
    if(postTwoDescription === ""){
        isError = true
        setPostTwoDescriptionError("Please enter post description")
    }
    if(postTwoUrl === ""){
        isError = true
        setPostTwoUrlError("Please enter post url")
    }
    if(postThreeImage === ""){
        isError = true
        setPostThreeImageError("Please enter post image url")
    }
    if(postThreeDescript === ""){
        isError = true
        setPostThreeDescriptError("Please enter post description")
    }
    if(postThreeUrl === ""){
        isError = true
        setPostThreeUrlError("Please enter post url")
    }
    if(postFourImage === ""){
        isError = true
        setPostFourImageError("Please enter image url")
    }
    if(postFourDescript === ""){
        isError = true
        setPostFourDescriptError("Please enter post description")
    }
    if(postFourUrl === ""){
        isError = true
        setPostFourUrlError("Please enter post url")
    }
    if(postFiveImage === ""){
        isError = true
        setPostFiveImageError("Please enter post image")
    }
    if(postFiveDescript === ""){
        isError = true
        setPostFiveDescriptError("Please enter post description")
    }
    if(postFiveUrl === ""){
        isError = true
        setPostFiveUrlError("Please enter poost url")
    }
    if(postSixImage === ""){
        isError = true
        setPostSixImageError("Please enter post image link")
    }
    if(postSixDescript === ""){
        isError = true
        setPostSixDescriptError("Please enter post description")
    }
    if(postSixUrl === ""){
        isError = true
        setPostSixUrlError("Please enter post image url")
    }
    if(postSevenImage === ""){
        isError = true
        setPostSevenImageError("Please enter post image url")
    }
    if(postSevenDescript === ""){
        isError = true
        setPostSevenDescriptError("Please enter post description")
    }
    if(postSevenUrl === ""){
        isError = true
        setPostSevenUrlError("Please enter post url")
    }
    
    if(!isError){
      Axios.post('/previewNewsletter', {type: 'nestedCol',params:{subject, description, postOneImage, postOneContent, postOneUrl, postTwoImage, postTwoDescription,postTwoUrl,postThreeImage, postThreeDescript, postThreeUrl, postFourImage,postFourDescript,postFourUrl,postFiveImage,postFiveDescript,postFiveUrl,postSixImage,postSixDescript,postSixUrl,postSevenImage,postSevenDescript,postSevenUrl}}).then(res =>{
        console.log(res)
        if(!res.data.isError){
          console.log(isError)
          dispatch({type: NEWSLETTER_THEME, payload: res.data.theme})
        }
      }).catch(error =>{
        console.log(error)
      })
    }
  }
  return (
    <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h3 className="text-center">Nested Columns Template</h3>
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
                              Title of the post
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="postTitle"
                              placeholder="Enter post title"
                              type="text"
                              value={subject} onChange={handleSubjectChange}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{subjectError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Description of the post
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={description} onChange={handleDescriptChange} id="postDescript" 
                              placeholder="Post description"
                              className="form-control"
                              type="text"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{descriptionError}</p>
                          <br />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                                First post image url
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="postTitle"
                              placeholder="Enter post image url"
                              type="text"
                              value={postOneImage} onChange={handlePostOneImage}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{postOneImageError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              First post content
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={postOneContent} onChange={handlePostOneContent} id="postDescript" 
                              placeholder="Enter first post content"
                              className="form-control"
                              type="textarea"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{postOneContentError}</p>
                          <br />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            First post url
                            </label>
                            <input type="text" placeholder="Enter post url" value={postOneUrl} onChange={handlePostOneUrl} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postOneUrlError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Second Post image url
                            </label>
                            <input type="text" placeholder="Enter post image link" value={postTwoImage} onChange={handlePostTwoImage} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postTwoImageError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Second post description
                              </label>
                              <input
                                className="form-control"
                                value={postTwoDescription} onChange={handlePostTwoDescription} id="postDescript" 
                                className="form-control"
                                placeholder="Enter post description"
                                type="text"
                              />
                            </FormGroup>
                            <br />
                            <p className="text-danger">{postTwoDescriptionError}</p>
                            <br />
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Second post link
                              </label>
                              <input
                                className="form-control"
                                value={postTwoUrl} onChange={handlePostTwoUrl} id="postDescript" 
                                className="form-control"
                                placeholder="Enter post url"
                                type="text"
                              />
                            </FormGroup>
                            <br />
                            <p className="text-danger">{postTwoDescriptionError}</p>
                            <br />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Third post image link
                            </label>
                            <input type="text" placeholder="Enter post image link" value={postThreeImage} onChange={handlePostThreeImage} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postThreeImageError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Third Post description
                            </label>
                            <input type="textarea" placeholder="Enter post description" value={postThreeDescript} onChange={handlePostThreeDescript} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postThreeDescriptError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Third post url
                            </label>
                            <input type="text" placeholder="Enter post url" value={postThreeUrl} onChange={handlePostThreeUrl} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postThreeUrlError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Forth Post Image Link
                            </label>
                            <input type="text" placeholder="Enter post image link" value={postFourImage} onChange={handlePostFourImage} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postFourImageError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Forth post description
                            </label>
                            <input type="text" placeholder="Enter post url" value={postFourDescript} onChange={handlePostFourDescript} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postFourDescriptError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Forth Post url
                            </label>
                            <input type="text" placeholder="Enter post image link" value={postFourUrl} onChange={handlePostFourUrl} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postFourUrlError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Fifth post image Link
                            </label>
                            <input type="text" placeholder="Enter post url" value={postFiveImage} onChange={handlePostFiveImage} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postFiveImageError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Fifth Post Description
                            </label>
                            <input type="text" placeholder="Enter post image link" value={postFiveDescript} onChange={handlePostFiveDescript} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postFiveDescriptError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Fifth post url
                            </label>
                            <input type="text" placeholder="Enter post url" value={postFiveUrl} onChange={handlePostFiveUrl} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postOneUrlError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Sixth post image link
                            </label>
                            <input type="text" placeholder="Enter post image link" value={postSixImage} onChange={handlePostSixImage} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postSixImageError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Six post description
                            </label>
                            <input type="text" placeholder="Enter post url" value={postSixDescript} onChange={handlePostSixDescript} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postSixDescriptError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Sixth Post url
                            </label>
                            <input type="text" placeholder="Enter post image link" value={postSixUrl} onChange={handlePostSixUrl} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postSixUrlError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Seventh post image link
                            </label>
                            <input type="text" placeholder="Enter post url" value={postSevenImage} onChange={handlePostSevenImage} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postSevenImageError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Seventh Post description
                            </label>
                            <input type="text" placeholder="Enter post image link" value={postSevenDescript} onChange={handlePostSevenDescript} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postSevenDescriptError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                              Seventh Post url
                            </label>
                            <input type="text" placeholder="Enter post url" value={postSevenUrl} onChange={handlePostSevenUrl} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{postSevenUrlError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                        
                      </Row>
                    </div>
                    <div className="pl-lg-4">
                        {/* <h6 className="heading-p text-muted">Newsletter Content</h6>
                            <FormGroup>
                              <Input
                                className="form-control-alternative"
                                value={content} onChange={handleContentChange} id="postDescript" 
                                placeholder="Post description"
                                className="form-control"
                                type="textarea"
                              />
                            </FormGroup>
                          <br /> */}
                        <p className="text-danger">{message}</p><br/>
                        {loader ? (<div className="d-block text-center">
                              <div className="spinner-border fast" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                          </div>): null}
                        
                        <div className="text-center mt-4">
                                <Button onClick={handleSubmit} color="warning" outline type="submit">
                                    Preview
                                <i className="far fa-paper-plane" className="ml-2" />
                            </Button>
                        </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
  )
}

export default NestedColTemplate
