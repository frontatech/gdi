import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup, MDBContainer } from "mdbreact";

const HomeSection2 = () => {
return (
<MDBContainer>
<h2 className="h1-responsive font-weight-bold my-5 text-center">
          Our Core Values
        </h2>
  <MDBCardGroup column>
    <MDBCard id="card1">
      <MDBCardBody>
        <MDBCardTitle className="text-white" tag="h1">
          Godliness With Contentment
        </MDBCardTitle>
        
      </MDBCardBody>
    </MDBCard>
    <MDBCard className="p-3" id="card2">
      <blockquote className="blockquote mb-0 card-body">
        <h1 className="text-white">
           Love, Peace, Equity & Justice
        </h1>
        
      </blockquote>
    </MDBCard>
    <MDBCard id="card3">
      <MDBCardBody>
        <MDBCardTitle className="text-white" tag="h2">Inclusiveness</MDBCardTitle>
      </MDBCardBody>
    </MDBCard>

    <MDBCard color="primary-color" text="white" id="card4" className="text-center p-3">
      <blockquote className="blockquote mb-0">
        <h3 className="text-white">
         Service and Sacrifice
        </h3>
      </blockquote>
    </MDBCard>

    <MDBCard className="text-center" id="card5">
      <MDBCardBody>
        <MDBCardTitle className="text-white" tag="h3">Grassroots Development</MDBCardTitle>
        
      </MDBCardBody>
    </MDBCard>

    <MDBCard className="text-right p-3" id="card6">
      <blockquote className="blockquote mb-0 card-body">
        <h3 className="text-white">
          Transparency, Probity and Accountability
        </h3>
      </blockquote>
    </MDBCard>

    <MDBCard id="card7">
      <MDBCardBody>
        <MDBCardTitle className="text-white" tag="h1">Team Work</MDBCardTitle>
      </MDBCardBody>
    </MDBCard>
  </MDBCardGroup>
</MDBContainer>
);
};

export default HomeSection2;