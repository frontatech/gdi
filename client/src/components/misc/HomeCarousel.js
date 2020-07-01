import React from "react";
import { Wave } from 'react-animated-text';
// <Wave text="EXAMPLE TEXT" />

// reactstrap components
import {
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";

// core components

const items = [
  {
    src: require("assets/img/gdi5.jpg"),
    altText: "Grassroots development Initiative",
    caption: "Grassroots Development Initiative",
    subtitle: "Good Governance and capacity building",
    toUrl:"/about-us",
    color:"success",
    title: "Learn More About Us"
  },
  {
    src: require("assets/img/gdi7.jpg"),
    altText: "To Feed and Educate People",
    caption: "To Feed and Educate People",
    subtitle: "We need your support",
    toUrl:"/donate",
    color:"danger",
    title: "Donate Now"
  },
  {
    src: require("assets/img/bg12.jpg"),
    altText: "Become a volunteer or a partner",
    caption: "Become a volunteer or a partner",
    subtitle: "Join Hands together with us to make the world a better place",
    toUrl:"/partner-with-us",
    color:"danger",
    title: "Become a partner"
  }
];

function HomeCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  return (
    <>
      <div className="" id="carousel" style={{maxWidth: '100%',width:'100%'}}>
        
          <Row className="justify-content-center carousel-section" >
            <Col lg="12" md="12">
              <Carousel
              
                activeIndex={activeIndex}
                next={next}
                previous={previous}
              >
                <CarouselIndicators
                  items={items}
                  activeIndex={activeIndex} 
                  onClickHandler={goToIndex}
                />
                {items.map((item,i) => {
                  return (
                    <CarouselItem
                      style={{width:"100%"}}
                      onExiting={onExiting}
                      onExited={onExited}
                      key={item.src}
                      slide={true}
                    ><div class="overlay"></div>
                      <img style={{height: '100vh',width: '100%'}} src={item.src} alt={item.altText} />
                      <div className="carousel-caption">
                        <h1 className="text-white title">{i === 0 ? <strong>Grassroots <span className="text-yellow">Development</span> Initiative</strong> : item.caption}</h1>

                        <h5 className="subtitle">{i === 0 ? <span className="text-red spanFor">For</span> : null} <em><Wave text={item.subtitle} /></em> </ h5>
                        <Button
                          className="btn-round"
                          color={item.color}
                          to={item.toUrl}
                          tag={Link}
                          size="sm"
                          
                        >
                          {item.title}
                        </Button>
                    </div>
                    </CarouselItem>
                  );
                })}
                <a
                  className="carousel-control-prev"
                  data-slide="prev"
                  href="#pablo"
                  onClick={e => {
                    e.preventDefault();
                    previous();
                  }}
                  role="button"
                >
                  <i className="now-ui-icons arrows-1_minimal-left"></i>
                </a>
                <a
                  className="carousel-control-next"
                  data-slide="next"
                  href="#pablo"
                  onClick={e => {
                    e.preventDefault();
                    next();
                  }}
                  role="button"
                >
                  <i className="now-ui-icons arrows-1_minimal-right"></i>
                </a>
              </Carousel>
            </Col>
          </Row>
      </div>
    </>
  );
}

export default HomeCarousel;
