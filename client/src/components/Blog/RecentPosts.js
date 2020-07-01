import React,{useState, useContext} from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Card, Container,Button } from 'reactstrap'
import backgroundImage from '../../assets/img/bg4.jpg'
import { PostContext } from 'context/PostContext';
import { Link } from 'react-router-dom';
const RecentPosts = ({showAnOnlineUser}) => {
    // const {posts} = []//useContext(PostContext)
    const posts = []
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3, // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1, // optional, default to 1.
        },
      };
    const dummpyPost = [{},{},{}]
    
    return (
        <div
        className="section section-signup"
        style={{
          backgroundImage: "url(" + require("assets/img/bg11.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          minHeight: "700px"
        }}
      >

<Container>
<h2 className="h1-responsive font-weight-bold my-2 text-center">Latest Posts</h2>
    <Carousel
    additionalTransfrom={0}
    arrows
    autoPlay
    autoPlaySpeed={2000}
    centerMode={false}
    className=""
    containerClass="container-with-dots"
    dotListClass=""
    draggable
    focusOnSelect={false}
    infinite
    itemClass=""
    keyBoardControl
    minimumTouchDrag={80}
    renderButtonGroupOutside={false}
    renderDotsOutside={true}
    swipeable={true}
    showDots={false}
    responsive={responsive}
    ssr={true} // means to render carousel on server-side.
    customTransition="all 2s linear"
    transitionDuration={2000}
    // containerClass="carousel-container"
    removeArrowOnDeviceType={["tablet", "mobile"]}
    // dotListClass="custom-dot-list-style"
    // itemClass="carousel-item-padding-40-px"
    >
        
            {
                posts.length !== 0 ? (posts.map(post =>
                     <div key={post.post_id} style={{padding:10}}>
                        <Card>
                            <img
                                alt="..."
                                className="rounded img-raised"
                                src={require("assets/img/bg5.jpg")}
                                ></img>
                                <h6 className="blue-text font-weight-bold text-center">{post.post_title}</h6>
                                <div className="grey-text">
                                <div className="text-center">
                                <p>{post.post_descript}</p>
                                <Button outline color="info" tag={Link} to={`/post_details/${post.post_slug}`} className="btn-round btn-sm ">Read More</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                )): (dummpyPost.map((post,index) => (
                    <div key={post.post_id} style={{padding:10}}>
                    <Card>
                        <img
                            alt="..."
                            className="rounded img-raised"
                            src={require("assets/img/bg5.jpg")}
                            ></img>
                            <h6 className="blue-text font-weight-bold text-center">GDI</h6>
                            <div className="grey-text">
                            <div className="text-center">
                            <p>Oops,It seems your internet is disconnected, check and refresh this page</p>
                            <Button outline color="info" tag={Link} to={`/post_details/${post.post_slug}`} disabled className="btn-round btn-sm ">Read More</Button>
                            </div>
                        </div>
                    </Card>
                </div>
                    )
                ))
            } 
    </Carousel>
</Container>
</div>
    )
}

export default RecentPosts
