import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup, MDBContainer } from "mdbreact";

const HomeSection2 = () => {
return (
<MDBContainer>
<h2 className="h1-responsive font-weight-bold my-5 text-center">
          Our Core Values
        </h2>
  <MDBCardGroup column>
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle tag="h5">
          Godliness With Contentment
        </MDBCardTitle>
        
      </MDBCardBody>
    </MDBCard>
    <MDBCard className="p-3">
      <blockquote className="blockquote mb-0 card-body">
        <h1>
           Love, Peace, Equity & Justice
        </h1>
        
      </blockquote>
    </MDBCard>
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle tag="h5">Inclusiveness</MDBCardTitle>
      </MDBCardBody>
    </MDBCard>

    <MDBCard color="primary-color" text="white" className="text-center p-3">
      <blockquote className="blockquote mb-0">
        <h3>
         Service and Sacrifice
        </h3>
      </blockquote>
    </MDBCard>

    <MDBCard className="text-center">
      <MDBCardBody>
        <MDBCardTitle tag="h5">Grassroots Development</MDBCardTitle>
        
      </MDBCardBody>
    </MDBCard>

    <MDBCard className="text-right p-3">
      <blockquote className="blockquote mb-0 card-body">
        <h3>
          Transparency, Probity and Accountability
        </h3>
      </blockquote>
    </MDBCard>

    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle tag="h5">Team Work</MDBCardTitle>
        <MDBCardText>
          This is a wider panel with supporting text below as a natural
          lead-in to additional content. This panel has even longer
          content than the first to show that equal height action.
        </MDBCardText>
        <MDBCardText small muted>
          Last updated 3 mins ago
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  </MDBCardGroup>
</MDBContainer>
);
};

export default HomeSection2;