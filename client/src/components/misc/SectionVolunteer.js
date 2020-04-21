import React from 'react'
import {Button} from 'reactstrap'
import { Link } from 'react-router-dom'
const SectionVolunteer = () => {
    return (
        <>
         <div
        className="section section-signup"
        style={{
          backgroundImage: "url(" + require("assets/img/bg3.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "200px"
        }}
      >
        <h1 className="h1-responsive font-weight-bold my-2 title text-center text-yellow">
        Become A Volunteer
        </h1>
        <p className="text-white text-center">Join your hand with us for a better life and beautiful future</p>
        <div className="text-center">
        <Button className="btn-round text-center" tag={Link} color="danger" to="/donate">
            Donate Now
        </Button>
        </div>
      </div>
        
        </>
    )
}

export default SectionVolunteer
