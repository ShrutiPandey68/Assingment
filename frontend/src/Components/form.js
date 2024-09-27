import React, { Component } from 'react';
import "./form.css";
import axios from 'axios';

class Form extends Component {
    debugger;
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      post: '',
      mobileNumber: '',
      gstNumber: '',
      organizationName: '',
      adharNumber: '',
      file: null,
      picture: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleFileChange(event) {
    this.setState({
      file: event.target.files[0]
    });
  }

  
  handlePictureChange(event) {
    this.setState({
      picture: event.target.files[0]
    });
  }

  async handleSubmit(event) {
    debugger;
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('surname', this.state.surname);
    formData.append('post', this.state.post);
    formData.append('mobileNumber', this.state.mobileNumber);
    formData.append('gstNumber', this.state.gstNumber);
    formData.append('organizationName', this.state.organizationName);
    formData.append('adharNumber', this.state.adharNumber);
    formData.append('file', this.state.file);
    formData.append('picture', this.state.picture);

    try {
      const response = await axios.post('http://localhost:4000/api/userform', formData);
      console.log(response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error submitting form. Please try again later.');
    }
  }


  render() {
    return (
        <div className="form-box">
            <h1>User Form</h1>
               <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Surname:
          <input
            type="text"
            name="surname"
            value={this.state.surname}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Post:
          <input
            type="text"
            name="post"
            value={this.state.post}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Mobile Number:
          <input
            type="tel"
            name="mobileNumber"
            value={this.state.mobileNumber}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          GST Number:
          <input
            type="text"
            name="gstNumber"
            value={this.state.gstNumber}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Organization Name:
          <input
            type="text"
            name="organizationName"
            value={this.state.organizationName}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Adhar Number:
          <input
            type="text"
            name="adharNumber"
            value={this.state.adharNumber}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          File Upload:
          <input
            type="file"
            name="file"
            onChange={this.handleFileChange}
          />
        </label>
        <br />
        <label>
          Picture Upload:
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={this.handlePictureChange}
          />
        </label>
        <br />

        <input type="submit" value="Submit" />
      </form>
        </div>
    );
  }
}

export default Form;
