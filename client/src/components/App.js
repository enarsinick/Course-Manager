import React from 'react';

import Courses from './Courses';
import Header from './Header';
import withContext from '../Context';

const CoursesWithContext = withContext(Courses);

function App() {
  return (
    <div className="App">
      <Header />
      <CoursesWithContext />
    </div>
  );
}

export default App;
