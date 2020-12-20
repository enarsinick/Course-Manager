import React from 'react';
import {Link} from "react-router-dom";

const Forbidden = () => {
    return (
        <div className="bounds course--detail">
          <h1>Forbidden</h1>
          <p>Uh oh! You can't access this page.</p>
          <Link className="button button-secondary" to={'/'}>Return to List</Link>
        </div>
    );
}

export default Forbidden;