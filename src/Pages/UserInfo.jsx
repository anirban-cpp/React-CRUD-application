import { MDBBtn } from "mdb-react-ui-kit";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UserInfo = () => {
  const { id } = useParams();
  const { users } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const user = users.find((item) => item.id === Number(id));

  return (
    <div style={{ marginTop: "100px" }}>
      <div
        className="row"
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "450px",
          alignContent: "center",
        }}
      >
        <p className="col-md-12 fs-3">User Details</p>
        <hr />
        <p className='col-md-6 fw-bold'>ID:</p>
        <p className='col-md-6'>{user.id}</p>
        <p className='col-md-6 fw-bold'>Name:</p>
        <p className='col-md-6'>{user.name}</p>
        <p className='col-md-6 fw-bold'>Email:</p>
        <p className='col-md-6'>{user.email}</p>
        <p className='col-md-6 fw-bold'>Phone:</p>
        <p className='col-md-6'>{user.phone}</p>
        <p className='col-md-6 fw-bold'>Address:</p>
        <p className='col-md-6'>{user.address}</p>
      </div>
      <MDBBtn onClick={() => navigate('/')} color="danger">
        Go Back
      </MDBBtn>
    </div>
  );
};

export default UserInfo;
