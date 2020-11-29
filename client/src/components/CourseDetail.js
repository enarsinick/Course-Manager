import React, {Component} from 'react';

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
          this.props.history.push('/errors');
        }
      })
      .catch(err => {
        console.log('Error with getting course details', err);
      }); 
  }
  
  render() {
    console.log(this.state.courseDetails)
    return (
      <div>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a
              className="button button-secondary" href="index.html">Return to List</a></div>
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