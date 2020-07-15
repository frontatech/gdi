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
const MultiPosts = () => {
  const {dispatch} = useContext(NewsletterContext)
  const [subject, setSubject] = useState('')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageLink, setImageLink] = useState('')
  const [postUrl, setPostUrl] = useState('')

  const [titleOne, setTitleOne] = useState('')
  const [descriptionOne, setDescriptionOne] = useState('')
  const [imageOneLink, setImageOneLink] = useState('')
  const [postOneUrl, setPostOneUrl] = useState('')

  const [titleTwo, setTitleTwo] = useState('')
  const [descriptionTwo, setDescriptionTwo] = useState('')
  const [imageTwoLink, setImageTwoLink] = useState('')
  const [postTwoUrl, setPostTwoUrl] = useState('')

  const [titleThree, setTitleThree] = useState('')
  const [descriptionThree, setDescriptionThree] = useState('')
  const [imageThreeLink, setImageThreeLink] = useState('')
  const [postThreeUrl, setPostThreeUrl] = useState('')

  
//   loader
  const [loader, setLoader] = useState(false)
  const [message, setMessage] = useState('')

  // errors
  const [subjectError, setSubjectError] = useState('')
  const [titleError, setTitleError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [imageLinkError, setImageLinkError] = useState('')
  const [postUrlError, setPostUrlError] = useState('')

  const [titleOneError, setTitleOneError] = useState('')
  const [descriptionOneError, setDescriptionOneError] = useState('')
  const [imageOneLinkError, setImageOneLinkError] = useState('')
  const [postOneUrlError, setPostOneUrlError] = useState('')

  const [titleTwoError, setTitleTwoError] = useState('')
  const [descriptionTwoError, setDescriptionTwoError] = useState('')
  const [imageTwoLinkError, setImageTwoLinkError] = useState('')
  const [postTwoUrlError, setPostTwoUrlError] = useState('')

  const [titleThreeError, setTitleThreeError] = useState('')
  const [descriptionThreeError, setDescriptionThreeError] = useState('')
  const [imageThreeLinkError, setImageThreeLinkError] = useState('')
  const [postThreeUrlError, setPostThreeUrlError] = useState('')
  // events
  const handleSubjectChange = e =>{
    setSubject(e.target.value)
    setSubjectError('')
  }
  //   first post
  const handleTitleChange = e =>{
    setTitle(e.target.value)
    setTitleError('')
  }
  const handleDescriptChange = e =>{
    setDescription(e.target.value)
    setDescriptionError('')
  }
  const handleImageLinkChange = e =>{
    setImageLink(e.target.value)
    setImageLinkError('')
  }
  const handlePostUrlChange = e =>{
    setPostUrl(e.target.value)
    setPostUrlError('')
  }
  //   second post
  const handleTitleOneChange = e =>{
    setTitleOne(e.target.value)
    setTitleOneError('')
  }
  const handleDescriptOneChange = e =>{
    setDescriptionOne(e.target.value)
    setDescriptionOneError('')
  }
  const handleImageOneLinkChange = e =>{
    setImageOneLink(e.target.value)
    setImageOneLinkError('')
  }
  const handlePostOneUrlChange = e =>{
    setPostOneUrl(e.target.value)
    setPostOneUrlError('')
  }
  //   third post
  const handleTitleTwoChange = e =>{
    setTitleTwo(e.target.value)
    setTitleTwoError('')
  }
  const handleDescriptTwoChange = e =>{
    setDescriptionTwo(e.target.value)
    setDescriptionTwoError('')
  }
  const handleImageTwoLinkChange = e =>{
    setImageTwoLink(e.target.value)
    setImageTwoLinkError('')
  }
  const handlePostTwoUrlChange = e =>{
    setPostTwoUrl(e.target.value)
    setPostTwoUrlError('')
  }
  //   third post
  const handlePostThreeChange = e =>{
    setTitleThree(e.target.value)
    setTitleThreeError('')
  }
  const handleDescriptThreeChange = e =>{
    setDescriptionThree(e.target.value)
    setDescriptionThreeError('')
  }
  const handleImageThreeLinkChange = e =>{
    setImageThreeLink(e.target.value)
    setImageThreeLinkError('')
  }
  const handlePostThreeUrlChange = e =>{
    setPostThreeUrl(e.target.value)
    setPostThreeUrlError('')
  }

  
  // handling submit
  const handleSubmit = e =>{
    e.preventDefault()
    let isError = false
    if(subject === ""){
      isError = true
      setSubjectError("Please enter newletter title")
    }
    if(title === ""){
        setTitleError("Please enter first post title")
    }
    if(description === ""){
        isError = true
        setDescriptionError("Please enter description")
    }
    if(imageLink === ""){
        isError = true
        setImageLinkError("Please enter post image url")
    }
    if(postUrl === ""){
        isError = true
        setPostUrlError("Please enter post url")
    }

    if(titleOne === ""){
        setTitleOneError("Please enter first post title")
    }
    if(descriptionOne === ""){
        isError = true
        setDescriptionOneError("Please enter description")
    }
    if(imageOneLink === ""){
        isError = true
        setImageOneLinkError("Please enter post image url")
    }
    if(postOneUrl === ""){
        isError = true
        setPostOneUrlError("Please enter post url")
    }

    if(titleTwo === ""){
        isError = true
        setTitleTwoError("Please enter first post title")
    }
    if(descriptionTwo === ""){
        isError = true
        setDescriptionTwoError("Please enter description")
    }
    if(imageTwoLink === ""){
        isError = true
        setImageTwoLinkError("Please enter post image url")
    }
    if(postTwoUrl === ""){
        isError = true
        setPostTwoUrlError("Please enter post url")
    }

    if(titleThree === ""){
        isError = true
        setTitleThreeError("Please enter first post title")
    }
    if(descriptionThree === ""){
      isError = true
      setDescriptionThreeError("Please enter description")
    }
    if(imageThreeLink === ""){
        isError = true
        setImageThreeLinkError("Please enter post image url")
    }
    if(postThreeUrl === ""){
        isError = true
        setPostThreeUrlError("Please enter post url")
    }

    
    
    
    if(!isError){
      Axios.post('/previewNewsletter', {type: 'multiposts',params:{subject, title, description, imageLink, postUrl, titleOne,descriptionOne, imageOneLink, postOneUrl, titleTwo,descriptionTwo, imageTwoLink, postTwoUrl,titleThree,descriptionThree, imageThreeLink, postThreeUrl
      }}).then(res =>{
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
                      <h3 className="text-center">Multiposts Template Template</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="bg-white">
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Subject of the newsletter
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
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Title of the first post
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="postTitle"
                              placeholder="Enter post title"
                              type="text"
                              value={title} onChange={handleTitleChange}
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
                              Description of the first post
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={description} onChange={handleDescriptChange} id="postDescript" 
                              placeholder="Post description"
                              className="form-control"
                              type="textarea"
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
                              First Post Image link
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="postTitle"
                              placeholder="Enter post title"
                              type="text"
                              value={imageLink} onChange={handleImageLinkChange}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{imageLinkError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              First post url
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={postUrl} onChange={handlePostUrlChange} id="postDescript" 
                              placeholder="Post description"
                              className="form-control"
                              type="text"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{postUrlError}</p>
                          <br />
                        </Col>
                      </Row>
                      {/* second post */}
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Title of the second post
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="postTitle"
                              placeholder="Enter post title"
                              type="text"
                              value={titleOne} onChange={handleTitleOneChange}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{titleOneError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Description of the second post
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={descriptionOne} onChange={handleDescriptOneChange} id="postDescript" 
                              placeholder="Post description"
                              className="form-control"
                              type="textarea"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{descriptionOneError}</p>
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
                              Second Post Image link
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="postTitle"
                              placeholder="Enter post title"
                              type="text"
                              value={imageOneLink} onChange={handleImageOneLinkChange}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{imageOneLinkError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Second post url
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={postOneUrl} onChange={handlePostOneUrlChange} id="postDescript" 
                              placeholder="Post description"
                              className="form-control"
                              type="text"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{postOneUrlError}</p>
                          <br />
                        </Col>
                      </Row>
                      {/* third post */}
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Title of the third post
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="postTitle"
                              placeholder="Enter post title"
                              type="text"
                              value={titleTwo} onChange={handleTitleTwoChange}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{titleTwoError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Description of the third post
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={descriptionTwo} onChange={handleDescriptTwoChange} id="postDescript" 
                              placeholder="Post description"
                              className="form-control"
                              type="textarea"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{descriptionTwoError}</p>
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
                              Third Post Image link
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="postTitle"
                              placeholder="Enter image link"
                              type="text"
                              value={imageTwoLink} onChange={handleImageTwoLinkChange}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{imageTwoLinkError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Third post url
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={postTwoUrl} onChange={handlePostTwoUrlChange} id="postDescript" 
                              placeholder="Post description"
                              className="form-control"
                              type="text"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{postTwoUrlError}</p>
                          <br />
                        </Col>
                      </Row>
                      {/* forth post */}
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Title of the forth post
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="postTitle"
                              placeholder="Enter post title"
                              type="text"
                              value={titleThree} onChange={handlePostThreeChange}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{titleThreeError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Description of the forth post
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={descriptionThree} onChange={handleDescriptThreeChange} id="postDescript" 
                              placeholder="Post description"
                              className="form-control"
                              type="textarea"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{descriptionThreeError}</p>
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
                              Forth Post Image link
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="postTitle"
                              placeholder="Enter post title"
                              type="text"
                              value={imageThreeLink} onChange={handleImageThreeLinkChange}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{imageThreeLinkError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Forth post url
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={postThreeUrl} onChange={handlePostThreeUrlChange} id="postDescript" 
                              placeholder="Post description"
                              className="form-control"
                              type="text"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{postThreeUrlError}</p>
                          <br />
                        </Col>
                      </Row>
                    </div>
                    <div className="pl-lg-4">
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

export default MultiPosts
