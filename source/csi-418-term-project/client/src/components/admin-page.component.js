import React, { Component } from 'react';
import {Redirect } from "react-router-dom";

import axios from 'axios';

export default class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.uploadInput = '';

    this.onChangeBio = this.onChangeBio.bind();
    this.onChangeProfileName = this.onChangeProfileName.bind();
    this.onLogOut = this.onLogOut.bind();

    this.state = {
      username: '',
      bio: '',
      link: '',
      success: false,
      selected: false,
      changed: false,
      loggedOut: false
    }
  }

  onChangeBio = (ev) => {
    this.setState({
      bio: ev.target.value,
      success: false,
      changed: true
    })
  }

  onChangeProfileName = (ev) => {
    this.setState({
      username: ev.target.value,
      success: false,
      changed: true
    })
  }

  componentDidMount() {
    axios.get('http://184.72.171.109:5000/profile/')
      .then(response => {
        this.setState({
          username: response.data.username,
          bio: response.data.bio,
          link: response.data.link,
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  fileSelected = (ev) => {
    if (ev.target.value.length > 0) {
      this.setState({ success: false,selected: true });
    }
  }

  // Perform the upload
  handleUpload = (ev) => {
    ev.preventDefault();
    console.log(this.state.selected)
    if (!this.state.selected) {
      alert("No file selected!");
      return;
    }
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    axios.post("http://184.72.171.109:5000/sign_s3", {
      fileName: fileName,
      fileType: fileType
    })
      .then(response => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
       
        console.log("Recieved a signed request " + signedRequest);
        //console.log(this.state.link);
        // Put the fileType in the headers for the upload
        var options = {
          headers: {
            'Content-Type': fileType
          }
        };
        axios.put(signedRequest, file, options)
          .then(result => {
            console.log("Response from s3")
            this.setState({
              link: url,
              changed: true
            })
          })
          .catch(error => {
            alert("ERROR " + JSON.stringify(error));
          })
      })
      .catch(error => {
        alert(JSON.stringify(error));
      })
  }

  onSaveChanges = (ev) => {
    ev.preventDefault();
    if (this.state.changed === true) {
      const profileData = {
        username: this.state.username,
        bio: this.state.bio,
        link: this.state.link,
      }
      console.log(profileData);

      axios.post("http://184.72.171.109:5000/admin/update", profileData)
        .then(res => console.log(res.data));
      //alert("Profile updated!");
      this.setState({ success: true, changed: false });
    }

  }

  onLogOut = (ev) => {
    ev.preventDefault();
    if (this.state.changed === true) {
      var exit = window.confirm("You still have unsaved changes. Log out?");
      console.log(exit);
      if (exit === true){
       this.setState({loggedOut: true});
      }
    }
    else{
      this.setState({loggedOut: true});
    }

  }

  render() {
    if (this.state.loggedOut === true)
    {
      return <Redirect to="/"/>
    }
    return (
      <div className="Login">
        <div class="row d-flex justify-content-center">
          <div class="col-md-6">
            <div class="card" style={{ width: "30rem" }} >
              <div class="card-body">
                <button align="right" class="btn btn-secondary float-right" type="button" onClick={this.onLogOut}>Logout</button>
                <form class="needs-validation">
                  <div>
                    <h2>Admin Console</h2>
                    <div align="center">
                    <div class="form-group">
                    <img class="profilepic padding-bottom" src={this.state.link} alt="profile"></img>
                    </div>
                    <div class="form-group">
                      <input onChange={this.fileSelected} ref={(ref) => { this.uploadInput = ref }} type="file" />
                      <button id="uploadBtn" type="button" class="btn btn-outline-secondary" onClick={this.handleUpload}>Upload
                      </button>
                      </div>
                    </div>
                    <div class="media-body">
                      <div class="form-group">
                        <label>Your name: </label>
                        <input type="string"
                          required
                          className="form-control"
                          onChange={this.onChangeProfileName}
                          defaultValue={this.state.username}
                        />
                      </div>
                      <div class="form-group">
                        <label>Your bio: </label>
                        <textarea type="string"
                          style={{ height: "200px" }}
                          required
                          className="form-control"
                          onChange={this.onChangeBio}
                          defaultValue={this.state.bio}
                        />
                      </div>
                      <div class="form-group">
                        <button type="submit" class="btn btn-primary" onClick={this.onSaveChanges}>Save Changes</button>
                      </div>
                    </div>
                  </div>
                  {this.state.success ? (
                    <div class="alert alert-success" role="alert">
                      Profile updated!
                    </div>
                  ) : <div/> 
                    }
                  {this.state.changed ? (
                    <div class="alert alert-danger" role="alert">
                      Unsaved Changes...
                    </div>
                  ) : <div/> 
                    }
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
