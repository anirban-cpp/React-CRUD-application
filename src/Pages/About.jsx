import { MDBTypography } from "mdb-react-ui-kit";
import React from "react";

const About = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      <MDBTypography note noteColor="primary">
        A Simple React CRUD application using Redux-Sagas. Along with that
        MDBBootstrap 5 is used for component design like Navbar, Form, Table,
        etc.
      </MDBTypography>
      <MDBTypography note noteColor="primary">
        Thanks for Stopping by....
      </MDBTypography>
    </div>
  );
};

export default About;
