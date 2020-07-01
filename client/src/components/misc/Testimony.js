import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Card, Container, CardHeader, CardBody } from 'reactstrap'
import backgroundImage from '../../assets/img/bg4.jpg'

const Testimony = () => {
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
    const testimonies = [{
        fullname: "Ori Chukwu Washpam",
        photo: require("assets/img/saying1.jpg"),
        message: "\"I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. \" "
    },
    {
        fullname: "Chief Dr. Offor Okorie",
        photo: require("assets/img/saying2.jpg"),
        message: "\"I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at.\" "
    },
    {
        fullname: "Reverend Father Reverend",
        photo: require("assets/img/saying3.jpg"),
        message: "\"I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at.\" "
    }]
    
    return (

        <Container>
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
                        testimonies.length !== 0 ? (testimonies.map(testimony =>
                            <div key={testimony.key} style={{padding:10,marginTop: 30}}>
                                <Card>
                                    <CardHeader style={{height: 100,backgroundImage: `url(${require("assets/img/bg4.jpg")})`}} >
                                        <img
                                        style={{position: "absolute", top: -35, left:'30%',height: 150, width: 150}}
                                        alt="..."
                                        className="rounded-circle img-raised"
                                        src={testimony.photo}
                                        />
                                    </CardHeader>
                                    
                                     <CardBody>
                                     <blockquote>
                                        <p className="blockquote">
                                        {testimony.message}
                                        <br></br>
                                        <br></br>
                                        <small>- {testimony.fullname}</small>
                                        </p>
                                    </blockquote>
                                     </CardBody>
                                </Card>
                            </div>
                        )): null
                    } 
            </Carousel>
        </Container>
    )
}

export default Testimony
