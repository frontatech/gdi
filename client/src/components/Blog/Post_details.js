import React, {useState, useEffect} from "react";
import { Link,} from "react-router-dom";
import axios from 'axios'
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
function PostDetails({location,history}) {
  const [showPost, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [totalComments, setTotalComments] = useState(0)
  const [showBtnText, setBtnText] = useState('Load More Comments')
  const [showLoadBtn, setLoadBtn] = useState(true)
  useEffect(() => {
    console.log(location.pathname)
    const path = location.pathname
    console.log(path.split('/')[2])
    if(path.split('/')[2] === "")return history.push('/404')
    axios.get(path).then(res =>{
      console.log(res)
      if(res.data.length === 0 || res.data.error){
       return history.push('/404')
      }
      setTotalComments(res.data.totalComments)
      setComments(res.data.comments)
      setPost(res.data.post)
      const remainComments = res.data.totalComments-res.data.comments.length
      setBtnText(() => remainComments === 1 ? `Load ${remainComments} More Comment`: `Load ${remainComments} More Comments`)
    }).catch(error =>{
      console.log(error)
    })
    return () => {
      	
    }
  }, [])
  const updateCommment = (comment) =>{
    setComments((comments) => [...comment, ...comments])
  }
  const loadMoreComments = (e) =>{
    e.preventDefault()
    setBtnText('Loading...')
    const lastId = comments.slice(-1)[0].comment_id
    const postId = comments.slice(-1)[0].post_id
    axios.post('/loadMoreComments',{lastId,postId}).then(res =>{
        const remainComments = totalComments-(comments.length+res.data.length)
        if(remainComments === 0){
          setLoadBtn(false)
          setBtnText('No More Comments')
        }
        setBtnText(() => remainComments === 1 ? `Load ${remainComments} More Comment`: `Load ${remainComments} More Comments`)
        setComments(posts => [...posts,...res.data])
    }).catch(error =>{
        console.log(error)
    })
}
  const contentMarkup = (e) => {
    return {__html: e};
  }
  
    
  return (
    <>
      
      <div className="wrapper">
        <LandingPageHeader />
        <div className="section section-about-us">
          <Container fluid>
            <Row>
                <Col lg="8">
                {showPost && showPost.map(post =>
                  <Card>
                    <CardHeader>
                      <h3 className="font-weight-bold text-justify text-black title">
                          {post.post_title}
                      </h3></CardHeader>
                    <CardBody>
                          <img src={require("assets/img/bg3.jpg")} alt={post.post_title} />
                          <h5 className="font-weight-bold text-justify text-black subtitle">
                              {post.post_descript}
                          </h5>
                          <div className="text-justify" dangerouslySetInnerHTML={contentMarkup(post.post_content)} />
                          <CommentForm postId={post.post_id} updateCommment={updateCommment}/>
                          <Comments comments={comments} />
                          {totalComments > 5 && showLoadBtn ? (<div className="col text-center">
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
                  <SuggestedPosts />
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
