import React, { useState } from 'react';
import './AddCustomer_design.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    address: '',
    city: '',
    state: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/sunbase/portal/api/assignment/addCustomer', {first_name:formData.firstName, last_name:formData.lastName, address:formData.address, city:formData.city, state:formData.state, email:formData.email, phone:formData.phone})
      .then((response) => {
        console.log('Customer added:', response.data);
        setFormData({
          firstName: '',
          lastName: '',
          street: '',
          address: '',
          city: '',
          state: '',
          email: '',
          phone: '',
        });
        navigate('/');
      })
      .catch((error) => {
        console.error('Error adding customer:', error);
      });
  };

  return (
    <div className="form-container">
      <h1 className="cust-header">Customer Details:</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-col">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-col">
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <input
              type="text"
              id="street"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
            />
          </div>
          <div className="form-col">
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-col">
            <input
              type="text"
              id="state"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-col">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
