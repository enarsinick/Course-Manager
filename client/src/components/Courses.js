import React, { useState, useEffect } from 'react';
import Course from './Course';
import config from '../config';

function Courses() {

  const [data, setData] = useState([]);

  // Fetch list of courses from the database
  useEffect(() => {
    fetch(`${config.apiBaseUrl}/courses`)
      .then(response => response.json())
      .then(response => setData(response))
      .catch(error => console.log('Error fetching the courses from database', error))
  }, []);

  // Map over the course data and create Course component
  const courses = data.map( course => (
    <Course title={course.title} key={course.id} id={course.id} /> 
  ));

  return (
    <div className="bounds">
      {courses}
    <div className="grid-33"><a className="course--module course--add--module" href="create-course.html">
        <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 13 13" className="add">
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>New Course</h3>
      </a></div>
  </div>
    
  );
}

export default Courses;