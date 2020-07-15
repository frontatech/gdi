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
import GeneralHeader from "../../Headers/GeneralHeader";
import { GeneralContext } from "admin/context/GeneralContext";
import { UPLOADED_FILES } from "admin/actions/actions";

const UploadPhotos = ({history}) => {
  const {dispatch} = useContext(GeneralContext)
  const [postPhotoFiles, setPostPhotoFiles] = useState([])
  const [uploadFiles, setUploadFiles] = useState(null)
  const [caption, setCaption] = useState('')
  const [loader, setLoader] = useState(false)
  const [message, setMessage] = useState(false)
  const [filesToUpload, setfilesToUpload] = useState(null)
  // this function handles photos upon selection
  const handlePhotoFiles = (e) =>{
    e.persist()
    console.log(e.target.files)
    let fileArray = []
    const files = e.target.files
    setfilesToUpload(files)
    console.log(files)
    for(let i= 0; i < files.length; i++){
      fileArray.push(files[i])
    }
    fileArray = fileArray.map(file =>({url:URL.createObjectURL(file),file}))
    if(fileArray.length !== 0){
      fileArray = postPhotoFiles.concat(fileArray)
      setPostPhotoFiles(fileArray)
      setUploadFiles(files)
    }
  }
  // this function handles removal of post photo file 
  const removePhotoFile = (e) =>{
    e.persist()
    const remainFiles = postPhotoFiles.filter(file => file.url !== e.target.id)
    setPostPhotoFiles(files => remainFiles)
  }    
  const handleCaptionChange = e =>{
    setCaption(e.target.value)
  }
  const handleSubmit = e =>{
    e.preventDefault()
    const formData =  new FormData()
    postPhotoFiles.forEach( postPhotoFile => {
      console.log(postPhotoFile)
      formData.append('galleryFiles',postPhotoFile.file)
    })
    formData.append('caption', caption)
    formData.append("admin",1)
    let isError = false
    if(postPhotoFiles.length <= 0){
      isError = true
      return setMessage('Select files to upload')
    }
    if(caption === ""){
      isError = true
      return setMessage('Please enter photo caption')
    }
    if(!isError){
      setMessage('')
      axios.post('/uploadToGallery',formData, {withCredentials: true, headers:{
        'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin':"*"
            }}).then(res =>{
              setLoader(false)
              setMessage(res.data.message)
              dispatch({type:UPLOADED_FILES,payload:res.data.photoFiles})
      }).catch(error =>{
        setLoader(false)
        if(error.response){
          setMessage(error.response.data.error)
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
                      <h3 className="text-center">Upload Photo Files To Gallery</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="bg-white">
                  <Form id="eventForm" encType="multipart/form-data">
                    <div className="pl-lg-4">
                      
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="eventBg"
                            >
                            Select Photos to upload
                            </label>
                            <Input
                              className="form-control"
                              style={{position: 'inherit',opacity: 1}}
                              name="galleryFiles"
                              type="file" accept="image/*" multiple onChange={handlePhotoFiles} id="eventBg"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger"></p>
                          <br />
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Photo caption
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Home Address"
                              type="textarea"
                              value={caption}
                              onChange={handleCaptionChange}
                            />
                          </FormGroup>
                          
                        </Col>
                        {postPhotoFiles.length !== 0 ?
                          <div className="uploadPrevFile">
                            <div className="d-flex justify-content-between flex-wrap uploadDiv" >
                              {postPhotoFiles && postPhotoFiles.map(file =><div key={file.url}>
                                <i onClick={removePhotoFile} id={file.url} className="pe-7s-close-circle photo-rm-icon"></i> 
                                <img src={file.url} style={{height: 200, width: 200}} />
                                </div>
                              )}
                            </div>
                          </div>:null
                        }
                      </Row>
                      <div className="d-block text-center">
                        <p className="text-danger">{message}</p>
                      </div>
                    </div>
                    <div className="pl-lg-4">
                    {loader ? (<div className="d-block text-center">
                              <div className="spinner-border fast" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                          </div>): null}
                        
                        <div className="text-center mt-4">
                                <Button onClick={handleSubmit} color="warning" outline type="submit">
                                    Upload Files
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

export default UploadPhotos;
