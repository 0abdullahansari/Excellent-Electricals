import React, { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If the field name includes a dot, it's a nested field (address)
    if (name.includes('.')) {
      const [parentField, childField] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        [parentField]: {
          ...prevData[parentField],
          [childField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the formData to your server for processing (e.g., registration API)
    console.log(formData);
    // You can make an API request here to create the customer
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Street:</label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Postal Code:</label>
          <input
            type="text"
            name="address.postalCode"
            value={formData.address.postalCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
