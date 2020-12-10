import React from 'react';
import { 
  BrowserRouter,
  Route, 
  Switch
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
import PrivateRoute from '../PrivateRoute';
import NotFound from './NotFound';
import Forbidden from './Forbidden';
import UnhandledError from './UnhandledError';

// Componenets with context
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderWithContext />
        <Switch>
          <Route exact path="/" component={CoursesWithContext}/>
          <PrivateRoute path="/courses/create" component={CreateCourseWithContext}/>
          <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext}/>
          <Route path="/courses/:id" component={CourseDetailWithContext}/>
          <Route path="/signin" component={UserSignInWithContext}/>
          <Route path="/signup" component={UserSignUpWithContext}/>
          <Route path="/signout" component={UserSignOutWithContext}/>
          <Route path="/forbidden" component={Forbidden}/>
          <Route path="/error" component={UnhandledError}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
