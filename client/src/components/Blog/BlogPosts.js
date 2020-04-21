import React, {useState, useEffect} from "react";
import { Link,} from "react-router-dom";
import axios from 'axios'
// reactstrap components
import {
  Button,
  Container,
  Row,
  Card,
  Col
} from "reactstrap";

// core components
import LandingPageHeader from "../Headers/LandingPageHeader.js";
function BlogPosts() {
  const [showPosts, setPosts] = useState([])
  const [showLoadBtn, setLoadBtn] = useState(false)
  const [showBtnText, setBtnText] = useState('Load More Posts')
  const [totalPosts, setTotalPosts] = useState(0)
  useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  
    useEffect(() => {
        axios.get('/posts').then(res =>{
            console.log(res)
            setPosts(res.data.posts)
            setTotalPosts(res.data.total)
        }).catch(error =>{
            console.log(error)
        })
    }, [])
    const loadMorePosts = (e) =>{
        e.preventDefault()
        setBtnText('Loading...')
        const lastId = showPosts.slice(-1)[0].post_id
        axios.post('/loadMorePosts',{lastId}).then(res =>{
            setBtnText('Load More Posts')
            if(res.data.length === 0) {
                setBtnText('No More Posts')
                return setLoadBtn(false)
            }
            setPosts(posts => [...posts,...res.data])
        }).catch(error =>{
            console.log(error)
        })
    }
  return (
    <>
      
      <div className="wrapper">
        <LandingPageHeader />
        <div className="section section-about-us blog">
          <Container fluid>
            <Row>
                {showPosts.length !== 0 ? (showPosts.map(post =>
                    (<Col key={post.post_id} className="text-center" lg="4">
                    <Card>
                        <div className="card-body">
                        <img
                            alt="..."
                            className="rounded img-raised"
                            src={require("assets/img/bg3.jpg")}
                            ></img>
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
                            </div>               
                        </Card>
                    </Col>   )
                )): null}
                 
            </Row>
            <div className="col text-center">
                {totalPosts > 12 && showLoadBtn ? (<Button
                className="btn-round btn-white"
                color="primary"
                onClick={loadMorePosts}
                size="lg"
                id="loadMoreBtn"
                >
                {showBtnText}
                </Button>): null}
                
            </div>        
          </Container>
        </div>
      </div>
    </>
  );
}

export default BlogPosts;
