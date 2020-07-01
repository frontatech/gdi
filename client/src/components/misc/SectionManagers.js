import React, {useState} from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Card, i, Container,Button } from 'reactstrap'
import backgroundImage from '../../assets/img/bg4.jpg'

const Managers = ({showAnOnlineUser}) => {
    const [showPreviousWinners, setShowPreviousWinners] = useState([])
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 4, // optional, default to 1.
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
    const gdiManagers = [{
        managerName:"Ori Chukwu Washpam",
        managerPhoto: require("../../assets/img/manager0.jpg"),
        managerPosition:'Chairman/CEO GDI'
        },
        {
        managerName:"Chief Dr. Offor Okorie",
        managerPhoto: require("../../assets/img/manager1.jpg"),
        managerPosition:'BOT Chairman GDI'
        },
        {
        managerName:"Reverend Father Reverend",
        managerPhoto: require("../../assets/img/manager2.jpg"),
        managerPosition:'Grand Patron GDI'
        }
    
]
    return (
        <div className="section section-examples bg-black">
            <Container>
            <h2 className="h1-responsive font-weight-bold my-5 text-center">
                    Our Management
                    </h2>
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
                            showPreviousWinners.length !== 0 ? (showPreviousWinners.map((previousWinner,index) =>{
                                return (<div key={index} style={{padding:10}}>
                                    <Card>
                                        <div className="card-image" src={backgroundImage} />
                                        <div className="profile mx-auto">
                                            <img
                                            src="https://mdbootstrap.com/img/Photos/Avatars/img%20(26).jpg"
                                            alt=""
                                            className="rounded-circle img-fluid"
                                            onClick={showAnOnlineUser} id={'supaWinner'+index} data-player={previousWinner.playerId} data-request="previous"
                                            />
                                        </div>
                                        <h4 className="font-weight-bold mt-1 text-center">{previousWinner.playerName}</h4>
                                        <h6 className="blue-text font-weight-bold text-center">
                                            Position {previousWinner.playerPosition}
                                        </h6>
                                        <p className="font-weight-normal">
                                            <i icon="quote-left" className="pr-2" />
                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                            elit. Quod eos id officiis hic tenetur.
                                        </p>
                                        <div className="grey-text">
                                            <div className="text-center">
                                            {/* <Button  onClick={showAnOnlineUser} id={nextId('supaWinner')} data-player={previousWinner.playerId} data-request="previous" className="btn-rounded btn-sm" gradient="aqua">View</Button> */}
                                            </div>
                                        </div>
                                    </Card>
                                </div>)
                            })): (gdiManagers.map((manager,index) =>{
                                return (
                                    <div key={index} style={{padding:10}}>
                                        <Card>
                                            <div className="card-body">
                                            <img
                                                alt="..."
                                                className="rounded img-raised"
                                                src={manager.managerPhoto}
                                                ></img>
                                                    <h3 className="font-weight-bold text-center text-black">
                                                    {manager.managerName}
                                                    </h3>
                                                    <p className="font-weight-normal text-center">
                                                    {manager.managerPosition}
                                                    </p>                           
                                                </div>               
                                                </Card>
                                            </div>
                                            )
                                        }))
                                    } 
        </Carousel>
    </Container>
    </div>
    )
}

export default Managers
