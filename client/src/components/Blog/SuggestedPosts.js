import React, {Fragment, useContext} from "react";
import { Link,} from "react-router-dom";
// reactstrap components
import moment from 'moment'
import {
  Button,
  Container,
  Row,
  Card,
  Col,
  CardHeader,
  CardBody
} from "reactstrap";
import { PostContext } from "context/PostContext";

function SuggestedPosts({postSlug}) {
   const {posts} = useContext(PostContext)
   const showPosts = posts.filter(post => post.post_slug !== postSlug).slice(0,5)
  return (
    <>
          <Container fluid>
            <Row>
                <Col className="text-center" lg="12">
                <CardHeader>Recommended For You</CardHeader>
                        {showPosts.length !== 0 ? (showPosts.map(post =>(
                            <Card key={post.post_id}>
                            <CardBody>
                                <img
                                    alt={post.post_descript}
                                    className="rounded img-raised"
                                    src={require("assets/img/bg3.jpg")}
                                />
                                <p className="font-weight-bold text-justify text-black title">
                                    {post.post_title}
                                </p>
                                <p className="text-muted">{moment(post.post_date).format("MMM Do YYYY")}</p>
                                <p className="font-weight-normal text-justify description">
                                    {post.post_descript}    
                                </p>   
                                <div className="col text-center">
                                    <Button
                                    className="btn-round btn-white"
                                    color="default"
                                    to={`/post_details/${post.post_slug}`}
                                    outline
                                    size="lg"
                                    tag={Link}
                                    >
                                    Read  More
                                    </Button>
                                </div>                      
                            </CardBody>              
                        </Card>))):null}
                    </Col> 
            </Row>
                   
          </Container>
    </>
  );
}

export default SuggestedPosts;
