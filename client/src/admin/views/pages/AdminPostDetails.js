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
import React, { useRef, useContext } from "react";
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
import { UPDATE_MEMBER_INFORMATION } from "admin/actions/actions.js";
import { AdminPostsContext } from "admin/context/AdminPostsContext.js";
import { UPDATE_POST } from "admin/actions/actions.js";


const AdminPostDetails = ({location:{state:{post}}}) => {
    const {dispatch} = useContext(AdminPostsContext)
    const photoRef = useRef(null)
    const photoRefUrl = useRef(null)
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
                  <div style={{height:300}}><img style={{height: '100%'}} className="rounded w-100" ref={photoRefUrl} src={post.post_bg} />
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
                  <div dangerouslySetInnerHTML={displayPost(post.post_content)} />
                  <div>Posted by: {post.post_author}</div>
                  <div>Posted on: {post.post_date}</div>
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
