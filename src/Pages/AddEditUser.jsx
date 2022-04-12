import React, { useEffect, useRef, useState } from "react";

import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUserStart, updateUserStart } from "../redux/Actions";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { users } = useSelector((state) => state.data);
  const userRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, phone, email, address } = formValue;

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      userRef.current = users.find((item) => item.id === Number(id));
      setFormValue({ ...userRef.current });
    } else {
      userRef.current = null;
      setFormValue({ ...initialState });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && phone && email && address) {
      if (userRef.current) {
        dispatch(updateUserStart({ id, formValue }));
        userRef.current = "";
        toast.success("User Updated Successfully");
        setTimeout(() => navigate("/"), 500);
      } else {
        dispatch(createUserStart(formValue));
        toast.success("User Added Successfully");
        setTimeout(() => navigate("/"), 500);
      }
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">
        {!userRef.current ? "Add" : "Edit"} User Details
      </p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={name || ""}
          name="name"
          type="text"
          onChange={onInputChange}
          required
          label="Name"
          validation="Name cannot be empty"
        />
        <br />
        <MDBInput
          value={email || ""}
          name="email"
          type="email"
          onChange={onInputChange}
          required
          label="Email"
          validation="Email cannot be empty"
        />
        <br />
        <MDBInput
          value={phone || ""}
          name="phone"
          type="number"
          onChange={onInputChange}
          required
          label="Phone"
          validation="Phone number cannot be empty"
        />
        <br />
        <MDBInput
          value={address || ""}
          name="address"
          type="text"
          onChange={onInputChange}
          required
          label="Address"
          validation="Address cannot be empty"
        />
        <br />
        <div className="col-12">
          <MDBBtn style={{ marginRight: "10px" }} type="submit">
            {userRef.current ? `Update` : `Add`}
          </MDBBtn>
          <MDBBtn onClick={() => navigate("/")} color="danger">
            Go Back
          </MDBBtn>
        </div>
      </div>
    </MDBValidation>
  );
};

export default AddEditUser;
