import React from "react";
import {
  Container,
} from "reactstrap";
import Testimony from "./Testimony";

// core components

function SectionTestimony() {
  return (
    <>
      <div className="section section-testimony">
        <Container>
        <h2 className="h1-responsive font-weight-bold my-5 text-center text-white">Our People Are Saying!</h2>
        <Testimony />
        </Container>
      </div>
    </>
  );
}

export default SectionTestimony;
