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

// core components

const items = [
  {
    src: require("assets/img/bg1.jpg"),
    altText: "Nature, United States",
    caption: "Nature, United States"
  },
  {
    src: require("assets/img/bg3.jpg"),
    altText: "Somewhere Beyond, United States",
    caption: "Somewhere Beyond, United States"
  },
  {
    src: require("assets/img/bg4.jpg"),
    altText: "Yellowstone National Park, United States",
    caption: "Yellowstone National Park, United States"
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
      <div  className="" id="carousel">
          <Row className="justify-content-center carousel-section">
            <Col lg="12" md="12">
              <Carousel
              style={{maxHeight:'100vh',height: '100vh'}}
                activeIndex={activeIndex}
                next={next}
                previous={previous}
              >
                <CarouselIndicators
                  items={items}
                  activeIndex={activeIndex} 
                  onClickHandler={goToIndex}
                />
                {items.map(item => {
                  return (
                    <CarouselItem
                      onExiting={onExiting}
                      onExited={onExited}
                      key={item.src}
                      slide={false}
                    >
                      <img style={{height: '100vh',width: '100vw'}} src={item.src} alt={item.altText} />
                      <div className="carousel-caption">
                        <h1 className="text-white title"><strong>Grassroots <span className="text-yellow">Development</span> Initiative</strong></h1>

                        <h5 className="subtitle"><span className="text-red spanFor">For</span> <em><Wave text="Good Governance & Capacity Building!" /></em> </ h5>
                        <Button
                          className="btn-round"
                          color="info"
                          href="/"
                          
                          size="lg"
                          
                        >
                          Learn More About Us
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
