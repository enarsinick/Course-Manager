import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {

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
    this.props.history.push('/');
  }

  submit = () => {
    const {context} = this.props;

    const course = {
      userId: context.authenticatedUser.id,
      firstName: context.authenticatedUser.firstName,
      lastName: context.authenticatedUser.lastName,
      emailAddress: context.authenticatedUser.emailAddress,
      password: context.authenticatedUser.password,
      title: this.state.title,
      description: this.state.description,
      estimatedTime: this.state.estimatedTime,
      materialsNeeded: this.state.materialsNeeded,
    };

    console.log(course)

    context.data.createCourse(course, course.emailAddress, course.password)
      .then( errors => {
        if (errors.length) {
          this.setState({errors});
        } else {
          this.props.history.push('/');
        }
      })
      .catch(err => {
        console.log('Issue with creating a course:', err)
        this.props.history.push('/error');
      })
    
  }

  render() {
    const {context} = this.props;

    return (
      <div className="bounds course--detail">
      <h1>Create Course</h1>
      <div>

      <Form 
        cancel={this.cancel}
        errors={this.state.errors}
        submit={this.submit}
        submitButtonText="Create Course"
        elements={() => (
          <React.Fragment>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text"        
                        className="input-title course--title--input" 
                        placeholder="Course title..." 
                        onChange={this.change}
                        >
                  </input>
                </div>
                <p>By {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.change}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"placeholder="Hours" onChange={this.change}></input>
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.change}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
          </React.Fragment>
        )} />
      </div>
    </div>
    );
  }
}