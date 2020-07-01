import React, {useState, useEffect, useContext} from "react";
import { Link,} from "react-router-dom";
import moment from 'moment'
// reactstrap components
import {
  Button,
  Container,
  Row,
  Card,
  Col,
  CardBody,
  CardHeader,
  CardFooter,
  Badge
} from "reactstrap";

// core components
import LandingPageHeader from "../Headers/LandingPageHeader.js";
import CommentForm from "./CommentForm.js";
import SectionVolunteer from "components/misc/SectionVolunteer.js";
import SectionHelp from "components/misc/SectionHelp.js";
import SuggestedPosts from "./SuggestedPosts.js";
import Comments from "./Comments.js";
import ScrollTop from "components/misc/ScrollTop.js";
import { CommentContext } from "context/CommentContext.js";
import { PostContext } from "context/PostContext.js";
function PostDetails({location,history}) {
  ScrollTop(location)
  const [postSlug, setPostSlug] = useState('')
  const {comments,totalComments,showLoadBtn,showBtnText,updateCommment,loadMoreComments,contentMarkup,getComments} = useContext(CommentContext)
  const {showPost,getPost} = useContext(PostContext)
  useEffect(() => {
    const path = location.pathname
    if(path.split('/')[2] === "")return history.push('/404')
    // getting the current viewed post slug
    const slug = path.split('/')[2]
    // updating the post slug state to be used in suggested posts
    setPostSlug(slug)
    // getting the particular post
    getPost(path,history,slug)
    // getting the comments of post
    getComments(`/comments/${slug}`)
    console.log(totalComments)
    return () => {}
  }, [location, history])
  
  
  return (
    <>
      
      <div className="wrapper">
        <LandingPageHeader title="Post details" background={require("assets/img/bg5.jpg")} />
        <div className="section section-about-us">
          <Container fluid>
            <Row>
                <Col lg="8">
                {showPost && showPost.map(post =>
                  <Card key={post.post_id}>
                    <CardHeader>
                      <h3 className="font-weight-bold text-justify text-black title">
                          {post.post_title}
                      </h3></CardHeader>
                    <CardBody>
                          <img src={require("assets/img/bg3.jpg")} alt={post.post_title} />
                          <h5 className="font-weight-bold text-justify text-black subtitle">
                              {post.post_descript}
                          </h5>
                          <p className="text-yellow">Posted on {moment(post.post_date).format("MMM Do YYYY")}</p>
                          <div className="text-justify" dangerouslySetInnerHTML={contentMarkup(post.post_content)} />
                          <CommentForm postId={post.post_id} updateCommment={updateCommment}/>
                          <Comments comments={comments} />
                          {totalComments > 5 && showLoadBtn? (<div className="col text-center">
                                <Button
                                className="btn-round btn-white"
                                color="primary"
                                onClick={loadMoreComments}
                                size="lg"
                                id="loadMoreBtn"
                                >
                                {showBtnText}
                                </Button>
                                
                            </div> ): <div className="col text-center"><Button
                                className="btn-round btn-white"
                                color="warning"
                                size="lg"
                                disabled
                                id="loadMoreBtn"
                                >
                                {'No Comments'}
                                </Button></div>}
                          
                    </CardBody>
                    <CardFooter className="border-0  font-weight-bold">
                        <p className="mr-4 mb-0 text-center">Tags</p>
                      {
                        post.post_tags.split(',').map(item => <Badge key={item} color="info" className="btn btn-rounded"><Link className="text-white" to={"/posts/"+item}>#{item.trim()}</Link></Badge>)
                      }
                    </CardFooter>
                  </Card>
                  )}
                </Col>
                <Col lg="4">
                  <SuggestedPosts postSlug={postSlug} />
                </Col>
            </Row>
                   
          </Container>
        </div>
        <SectionVolunteer />
        <SectionHelp />
      </div>
    </>
  );
}

export default PostDetails;
