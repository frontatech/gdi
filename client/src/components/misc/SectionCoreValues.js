import React from "react";
import {  MDBRow, MDBCol, MDBIcon } from "mdbreact";

const HomeSection3 = () => {
  return (
      <section className="text-center my-5">
        <h1 className="h1-responsive font-weight-bold my-5 title">Our Partners</h1>
        <p className="lead grey-text w-responsive mx-auto mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam.
        </p>
        <MDBRow>
          <MDBCol md="3">
            <MDBIcon icon="chart-area" size="3x" className="red-text" />
            <h5 className="font-weight-bold my-4">Analytics</h5>
            <p className="grey-text mb-md-0 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit maiores aperiam minima assumenda deleniti hic.
            </p>
          </MDBCol>
          <MDBCol md="3">
            <MDBIcon icon="book" size="3x" className="cyan-text" />
            <h5 className="font-weight-bold my-4">Tutorials</h5>
            <p className="grey-text mb-md-0 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit maiores aperiam minima assumenda deleniti hic.
            </p>
          </MDBCol>
          <MDBCol md="3">
            <MDBIcon far icon="comments" size="3x" className="orange-text" />
            <h5 className="font-weight-bold my-4">Support</h5>
            <p className="grey-text mb-md-0 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit maiores aperiam minima assumenda deleniti hic.
            </p>
          </MDBCol>
          <MDBCol md="3">
            <MDBIcon far icon="comments" size="3x" className="orange-text" />
            <h5 className="font-weight-bold my-4">Support</h5>
            <p className="grey-text mb-md-0 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit maiores aperiam minima assumenda deleniti hic.
            </p>
          </MDBCol>
        </MDBRow>
      </section>
  );
}

export default HomeSection3;