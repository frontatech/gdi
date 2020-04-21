import React,{useState} from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Card, i, Container,Button } from 'reactstrap'
import backgroundImage from '../../assets/img/bg4.jpg'
const RecentPosts = ({showAnOnlineUser}) => {
    const [showPreviousWinners, setShowPreviousWinners] = useState([])
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
    const emptyWinners = [{
        playerAward:4000,
        playerGameYear:2019,
        playerId:'kdls',
        playerPosition: 3,
        playerReward: '31-12-2019'
    },
    {
        playerAward:4000,
        playerGameYear:2019,
        playerId:'kdls',
        playerPosition: 3,
        playerReward: '31-12-2019'
    },
    {
        playerAward:4000,
        playerGameYear:2019,
        playerId:'kdls',
        playerPosition: 3,
        playerReward: '31-12-2019'
    },{
        playerAward:4000,
        playerGameYear:2019,
        playerId:'kdls',
        playerPosition: 3,
        playerReward: '31-12-2019'
    }
]
    
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
<h2 className="h1-responsive font-weight-bold my-2 text-center">
          Latest Posts
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
                })): (emptyWinners.map((winner,index) =>{
                    return (
                        <div key={index} style={{padding:10}}>
                            <Card>
                                <div className="card-image" src={backgroundImage} />
                                <img
                  alt="..."
                  className="rounded img-raised"
                  src={require("assets/img/bg5.jpg")}
                ></img>

                                {/* <h4 className="font-weight-bold mt-1 text-center">hello</h4> */}
                                <h6 className="blue-text font-weight-bold text-center">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                                </h6>
                                <p className="font-weight-normal">
                                    <i icon="quote-left" className="pr-2" />
                                   
                                </p>
                                <div className="grey-text">
                                    <div className="text-center">
                                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit est laborum...</p>

                                    <Button outline color="info" className="btn-round btn-sm ">Read More</Button>
                                    </div>
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

export default RecentPosts
