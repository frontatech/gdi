import React, {useState, useEffect, Fragment} from "react";
import { Link,} from "react-router-dom";
import axios from 'axios'
// reactstrap components
import {
  Button,
  Container,
  Row,
  Card,
  Col,
  CardHeader,
  CardBody
} from "reactstrap";

// core components

function SuggestedPosts() {
    const [showPosts, setPosts] = useState([])
    useEffect(() => {
        axios.get('/posts').then(res =>{
            console.log(res)
            setPosts(res.data.posts)
        }).catch(error =>{
            console.log(error)
        })
    }, [])
    
  return (
    <>
          <Container fluid>
            <Row>
                <Col className="text-center" lg="12">
                <CardHeader>Recommended For You</CardHeader>
                        {showPosts.length !== 0 ? (showPosts.map(post =>(
                            <Card>
                            
                            <CardBody>
                            <Fragment key={post.post_id}>
                                <img
                                    alt="..."
                                    className="rounded img-raised"
                                    src={require("assets/img/bg3.jpg")}
                                />
                                <h5 className="font-weight-bold text-justify text-black title">
                                    {post.post_title}
                                </h5>
                                <p className="text-muted">{post.post_date}</p>
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
                            </Fragment>                      
                            </CardBody>              
                        </Card>))):null}
                    </Col> 
            </Row>
                   
          </Container>
    </>
  );
}

export default SuggestedPosts;
