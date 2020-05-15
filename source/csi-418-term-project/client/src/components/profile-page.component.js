import React, { Component } from 'react';
import axios from 'axios';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      bio: '',
      link: ''
    }
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
  render() {
    return (
      <div class="media">
        <div className="Profile">
          <div class="row d-flex justify-content-center">
            <div class="col-md-6">
              <div class="card" style={{ width: "30rem" }} >
                <div class="card-body">

                  <form class="needs-validation">
                    <div>
                      <div align="center">
                        <div class="form-group">
                          <img class="profilepic padding-bottom" src={this.state.link} alt="profile"></img>
                        </div>
                        <div class="media-body">
                          <div class="form-group">
                            <h3>{this.state.username}</h3>                         
                          </div>
                          <div class="form-group">
                            <label>{this.state.bio}</label>                         
                          </div>                        
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
