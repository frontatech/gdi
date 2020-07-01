import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup, MDBContainer, MDBCardHeader } from "mdbreact";

const HomeSection2 = () => {
return (
<MDBContainer>
<h2 className="h1-responsive font-weight-bold my-5 text-center">
          Our Core Values
        </h2>
  <MDBCardGroup column>
    <MDBCard id="card7"> 
      <MDBCardHeader id="card1"><img className="mx-auto d-block " src={require("../../assets/img/icons/icon.svg")} alt="icon" /></MDBCardHeader>
      <MDBCardBody>
        
        <MDBCardTitle tag="h3">
          Godliness With Contentment
        </MDBCardTitle>
        
      </MDBCardBody>
    </MDBCard>
    <MDBCard id="card7">
    <MDBCardHeader id="card1"><img className="mx-auto d-block " src={require("../../assets/img/icons/icon1.svg")} alt="icon" /></MDBCardHeader>
      <blockquote className="blockquote mb-0 card-body">
        <h3>
           Love, Peace, Equity & Justice
        </h3>
        
      </blockquote>
    </MDBCard>
    <MDBCard id="card7">
      <MDBCardHeader id="card1"><img className="mx-auto d-block " src={require("../../assets/img/icons/icon2.svg")} alt="icon" /></MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle tag="h3">Inclusiveness</MDBCardTitle>
      </MDBCardBody>
    </MDBCard>

    <MDBCard id="card7" className="text-center">
    <MDBCardHeader id="card1"><img className="mx-auto d-block " src={require("../../assets/img/icons/icon3.svg")} alt="icon" /></MDBCardHeader>
      <blockquote className="blockquote mb-0">
        <h3>
         Service and Sacrifice
        </h3>
      </blockquote>
    </MDBCard>

    <MDBCard id="card7" className="text-center">
    <MDBCardHeader id="card1"><img className="mx-auto d-block " src={require("../../assets/img/icons/icon4.svg")} alt="icon" /></MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle tag="h3">Grassroots Development</MDBCardTitle>
        
      </MDBCardBody>
    </MDBCard>

    <MDBCard className="text-right p-3" id="card6">
    <MDBCardHeader id="card1"><img className="mx-auto d-block " src={require("../../assets/img/icons/icon5.svg")} alt="icon" /></MDBCardHeader>
      <blockquote className="blockquote mb-0 card-body">
        <h3>
          Transparency, Probity and Accountability
        </h3>
      </blockquote>
    </MDBCard>

    <MDBCard id="card7">
    <MDBCardHeader id="card1"><img className="mx-auto d-block " src={require("../../assets/img/icons/icon6.svg")} alt="icon" /></MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle tag="h3">Team Work</MDBCardTitle>
      </MDBCardBody>
    </MDBCard>
  </MDBCardGroup>
</MDBContainer>
);
};

export default HomeSection2;