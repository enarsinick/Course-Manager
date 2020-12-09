import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class CourseDetail extends Component {

  state = {
    courseDetails: {
      owner: {},
    },
  }
  

  componentDidMount() {
    const { context } = this.props;
    const { id } = this.props.match.params;
    context.data.getCourseDetails(id)
      .then(response => {
        if (response) {
          this.setState({
            courseDetails: response,
            owner: response.owner,
          })
          
        } else {
          console.log(response.errors)
          this.props.history.push('/errors');
        }
      })
      .catch(err => {
        console.log('Error with getting course details', err);
      });
  }

  delete = () => {
    const {context} = this.props;
    context.data.deleteCourse(this.state.courseDetails.id, context.authenticatedUser.emailAddress, context.authenticatedUser.password)
      .then(errors => {
        if (errors.length) {
          console.log('Error with deletion process', errors)
        } else {
          console.log('Course successfull deleted');
          this.props.history.push('/');
        }
      })
      .catch(err => {
        console.log(err)
      }) 
  }
  
  render() {

    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const courseOwnerID = this.state.courseDetails.userId;
    
    return (
      <div>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
              {authUser.id === courseOwnerID ?
                <React.Fragment>
                  <span>
                    <Link className="button" to={`/courses/${this.state.courseDetails.id}/update`}>Update Course</Link>
                    <button className="button" onClick={this.delete}>Delete Course</button>
                  </span>
                </React.Fragment>
                :
                null
              }
            <Link className="button button-secondary" to={'/'}>Return to List</Link>
          </div>
        </div>
      </div>
      <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
    <h3 className="course--title">{this.state.courseDetails.title}</h3>
            <p>By {this.state.courseDetails.owner.firstName} {this.state.courseDetails.owner.lastName}</p>
          </div>
          <div className="course--description">
    <p>{this.state.courseDetails.description}</p>
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
    <h3>{this.state.courseDetails.estimatedTime}</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ul>
    <li>{this.state.courseDetails.materialsNeeded}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    );
  }
  
}