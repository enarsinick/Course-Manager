import React, { Component } from 'react';
import './App.css';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      courses: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(response => {
        this.setState({ courses: response});
      })
      .catch(error => {
        console.log('Error fetching data', error)
      })

      
  }

  render() {

    let results = this.state.courses;
    let courses;

    if (this.state.courses) {
      courses = results.map(result => {
      return <li>{result.title}</li>
      })
    } 
    return(
      <div className="App">
        {courses}
      </div>
    )
  }

}


// function App() {
//   return (
//     <div className="App">

//     </div>
//   );
// }

// export default App;
