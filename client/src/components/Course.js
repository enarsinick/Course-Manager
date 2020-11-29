import React, { useState } from 'react';
import {Link} from "react-router-dom";

function Course({title, id}) {

  return (
    <div className="grid-33">
      <Link className="course--module course--link" id={id} to={`/courses/${id}`}>
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{title}</h3>
      </Link>
    </div>
  );
}

export default Course;