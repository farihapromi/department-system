import React, { Component } from 'react';
import axios from 'axios';

class Date extends Component {
    // const [courses, setCourses] = useState([]);
    // const [selectedCourse, setSelectedCourse] = useState('');
   

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      courses: [],  // store the list of courses here
      selectedCourse: ''  // store the selected course here
    };
  }

  componentDidMount() {
   
   
   
const username = 'fariha';
 const password = '123';

    axios.get('http://localhost:8000/dropdown/course/',
    {
        headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`
          }
    })
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleCourseChange = event => {
    // Update the selected course when the user changes the dropdown selection
    this.setState({ selectedCourse: event.target.value });
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(item => (
              <tr key={item.id}>
                <td>
                  <input type="date" value={item.date} />
                </td>
                <td>

                <select value={this.state.selectedCourse} onChange={this.handleCourseChange}>
          {this.state.data.map(course => (
            <option key={course.id} value={course.code}>{course.code}</option>
          ))}
        </select>
                {/* <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
        {courses.map(course => (
          <option key={course.id} value={course.code}>{course.name}</option>
        ))}
      </select> */}
                  {/* <select value={item.code}>
                    <option value="course1">{item.code}</option>
                    <option value="course2">Course 2</option>
                    <option value="course3">Course 3</option>
                  </select> */}

                </td>

               

                <td>
                <select value={this.state.selectedCourse} onChange={this.handleCourseChange}>
          {this.state.data.map(course => (
            <option key={course.id} value={course.name}>{course.name}</option>
          ))}
        </select></td>
                <td>
                    
                  <input type="number"  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Date;
