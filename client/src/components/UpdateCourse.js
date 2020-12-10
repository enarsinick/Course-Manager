import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {

  state = {
    userId:"",
    firstName:"",
    lastName:"",
    emailAddress:"",
    password:"",
    title:"",
    description:"",
    estimatedTime:"",
    materialsNeeded:"",
    errors:[]
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  cancel = () => {
    this.props.history.goBack();
  }

  submit = () => {
    const {context} = this.props;
    const { id } = this.props.match.params;

    const {
      userId,
      emailAddress,
      password,
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;

    const courseData = {userId, title, description, estimatedTime, materialsNeeded}

    context.data.updateCourse(id, courseData, emailAddress, password)
      .then( errors => {
        if (errors.length) {
          this.setState({errors})
        } else {
          this.props.history.goBack();
        }
      })
      .catch(err => {
        console.log('Issue with updating the course', err);
        this.props.history.push('/error');
      })
  }

  componentDidMount() {
    const { context } = this.props;
    const { id } = this.props.match.params;
    context.data.getCourseDetails(id)
      .then(response => {
        if (response && response.userId === context.authenticatedUser.id) {
          this.setState({
            userId: response.userId,
            firstName: response.owner.firstName,
            lastName: response.owner.lastName,
            emailAddress: response.owner.emailAddress,
            title: response.title,
            description: response.description,
            estimatedTime: response.estimatedTime,
            materialsNeeded: response.materialsNeeded,
            password: context.authenticatedUser.password,
          })
        } else {
          console.log(response.errors);
          this.props.history.push('/forbidden');
        }
      })
      .catch(err => {
        console.log('Error with getting course details', err);
        this.props.history.push('/notfound');
      });
  }


  render() {
    return (
      <div class="bounds course--detail">
          <h1>Update Course</h1>
          <div>
            <Form
            cancel={this.cancel}
            errors={this.state.errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" 
                          className="input-title course--title--input" 
                          placeholder="Course title..." 
                          value={this.state.title}
                          onChange={this.change}
                          ></input></div>
                    <p>By {this.state.firstName} {this.state.lastName}</p>
                  </div>
                  <div className="course--description">
            <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.change} value={this.state.description}></textarea></div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                          <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                            placeholder="Hours" onChange={this.change} value={this.state.estimatedTime}></input>
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.change} value={this.state.materialsNeeded}></textarea></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>)} />
          </div>
        </div>
    );
  }
}