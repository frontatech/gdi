import React, { Fragment, useRef, useContext, useState, useReducer } from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CardFooter
} from "reactstrap";
// core components
import GeneralHeader from "../../Headers/GeneralHeader";
import { AdminPostsContext } from "admin/context/AdminPostsContext";

const AllPosts = () => {
    const {postState:{posts,totalPosts}, dispatch} = useContext(AdminPostsContext)
    const handleDeleteMember = (e, id) =>{
        e.preventDefault()
    }
    return (
        <Fragment>
        <GeneralHeader />
        {/* Page content */}
        <Container fluid>
            <CardHeader><h3 className="text-center">We have  {totalPosts} Posts</h3></CardHeader>
          <Row>
              {posts.map(post => (
                  <Col lg="6" xl="3" key={`${post.post_id}`}>
                  <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                          <div className="d-block text-center">
                              <div>
                                    <div className="card-profile-image">
                                        <Link
                                            to={{
                                                pathname: `/admin/post_details/${post.post_slug}`,
                                                state: {post}
                                            }}
                                            id="tooltip742438047"
                                        >
                                                <img
                                                alt="..."
                                                style={{height: 100}}
                                                className="rounded"
                                                src={post.post_bg}
                                                />                                            
                                        </Link>
                                  </div>
                              </div>
                          </div>
                        </CardBody>                              
                      <CardFooter  className="mt-6">
                      <div>
                              <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0 d-block text-center"
                              >
                                  <Link to={{
                                          pathname: `/admin/post_details/${post.post_slug}`,
                                          state: {post}
                                      }} className="font-weight-bold mb-0">{`${post.post_title}`}</Link>
                              </CardTitle>
                          </div> 
                          <div className="container mt-2">
                              <div className="d-flex justify-content-between">
                                  <Link to="#" onClick={(e) =>handleDeleteMember(e,post.post_id)}><i className="fa fa-times text-danger" /></Link>
                                  <Link to={{
                                          pathname: `/admin/edit-post/${post.post_slug}-${post.post_id}`,
                                          state: {post}
                                      }}><i className="fa fa-edit text-info" /></Link>
                                  <Link to={{
                                                pathname: `/admin/post_details/${post.post_slug}`,
                                                state: {post}
                                            }}><i className="fa fa-eye text-success" /></Link>
                              </div>
                          </div>
                      </CardFooter>
                  </Card>
              </Col>
              ))}
          </Row>
        </Container>
      </Fragment>
    )
}

export default AllPosts
