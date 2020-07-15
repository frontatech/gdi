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
const CarouselTemplate = () => {
  const {dispatch} = useContext(NewsletterContext)
  
  const [company, setCompany] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [imageOne, setImageOne] = useState('')
  const [imageTwo, setImageTwo] = useState('')
  const [imageThree, setImageThree] = useState('')
  const [btnText, setBtnText] = useState('')
//   loader
  const [loader, setLoader] = useState(false)
  const [message, setMessage] = useState('')

  // errors
  const [subjectError, setSubjectError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [btnTextError, setBtnTextError] = useState('')
  const [companyError, setCompanyError] = useState('')
  const [imageOneError, setImageOneError] = useState('')
  const [imageTwoError, setImageTwoError] = useState('')
  const [imageThreeError, setImageThreeError] = useState('')
  // events
  const handleSubjectChange = e =>{
    setSubject(e.target.value)
    setSubjectError('')
  }
  const handleDescriptChange = e =>{
    setDescription(e.target.value)
    setDescriptionError('')
  }
  
  const handleBtnTextChange = e =>{
    setBtnText(e.target.value)
    setBtnTextError('')
  }
  const handleCompanyChange = e =>{
    setCompany(e.target.value)
    setCompanyError('')
  }
  const handleImageOneChange = e =>{
    setImageOne(e.target.value)
    setImageOneError('')
  }
  const handleImageTwoChange = e =>{
    setImageTwo(e.target.value)
    setImageTwoError('')
  }
  const handleImageThreeChange = e =>{
    setImageThree(e.target.value)
    setImageThreeError('')
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
    if(company === ""){
      isError = true
      setCompanyError("Please enter company name")
    }
    if(imageOne === ""){
      isError = true
      setImageOneError("Please enter first image link")
    }
    if(imageTwo === ""){
        isError = true
        setImageTwoError("Please enter two image link")
    }
    if(imageThree === ""){
        isError = true
        setImageThreeError("Please enter three image link")
    }
    if(btnText === ""){
      isError = true
      setBtnTextError("Please select button text")
    }
    
    if(!isError){
      Axios.post('/previewNewsletter', {type: 'carousel',params:{company, subject, imageOne, imageTwo, imageThree, description, btnText}}).then(res =>{
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
                      <h3 className="text-center">Carousel Template Template</h3>
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
                              Subject of the post
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
                          <label htmlFor="postMetatags" className="grey-text">
                            Company name
                            </label>
                            <input type="text" placeholder="Enter company name" value={company} onChange={handleCompanyChange} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{companyError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Post Image One
                            </label>
                            <input type="text" placeholder="Enter post image link" value={imageOne} onChange={handleImageOneChange} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{imageOneError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Post Two Image Link
                            </label>
                            <input type="text" placeholder="Enter post image link" value={imageTwo} onChange={handleImageTwoChange} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{imageTwoError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Post Three Image Link
                            </label>
                            <input type="text" placeholder="Enter post image link" value={imageThree} onChange={handleImageThreeChange} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{imageThreeError}</p>
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
                                Button text
                              </label>
                              <select className="form-control" onChange={handleBtnTextChange}>
                                <option>Select button text</option>
                                <option>Read More</option>
                                <option>Learn More</option>
                                <option>Visit our site</option>
                              </select>
                            </FormGroup>
                            <br />
                            <p className="text-danger">{btnTextError}</p>
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

export default CarouselTemplate
