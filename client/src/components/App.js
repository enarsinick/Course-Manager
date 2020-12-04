import React from 'react';
import { 
  BrowserRouter,
  Route
} from 'react-router-dom';

// Import components
import Courses from './Courses';
import Header from './Header';
import withContext from '../Context';
import UserSignIn from './UserSignIn';
import UserSignUp from './UserSignUp';
import UserSignOut from './UserSignOut';
import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';
import CourseDetail from './CourseDetail';
import Course from './Course';

// Componenets with context
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderWithContext />
        <Route exact path="/" component={CoursesWithContext}/>
        <Route path="/courses/create" component={CreateCourseWithContext}/>
        <Route path="/courses/:id/update" component={UpdateCourse}/>
        <Route path="/courses/:id" component={CourseDetailWithContext}/>
        <Route path="/signin" component={UserSignInWithContext}/>
        <Route path="/signup" component={UserSignUpWithContext}/>
        <Route path="/signout" component={UserSignOutWithContext}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
