
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CourseList extends Component {
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

render(){
    const empData=this.state.data;
    const rows=empData.map((emp)=>
        <tr key={emp.id}>
            <td>{emp.date}
            
            </td>
            <td>{emp.code}</td>
            <td>{emp.name}</td>
            <td>{emp.duration}</td>
            
        </tr>
    );
    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Course Code</th>
              <th>Course Name</th>
              <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

}
export default CourseList;