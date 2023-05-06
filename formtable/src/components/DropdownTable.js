import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DropdownTable.css'
// import Select from 'react-select';

function DropdownTable() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseOptions, setCourseOptions] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const username = 'fariha';
  const password = '123';

  useEffect(() => {
    // Fetch course options
    axios.get('http://localhost:8000/dropdown/course/',
    {
        headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`
          }
    }
    )
      .then(response => setCourseOptions(response.data))
      .catch(error => console.log(error));

    // Fetch course data for the selected course
    if (selectedCourse !== null) {
      axios.get(`http://localhost:8000/dropdown/courses/${selectedCourse}/`)
        .then(response => setCourseData(response.data))
        .catch(error => console.log(error));
    }
  }, [selectedCourse]);

  const handleChange = (event) => {
    setSelectedCourse(event.target.value);
  }

  return (
    <div>
         <div className="Title">
        <h1 className='dept fw-bold'>Dept.of Computer Science and Engineering</h1>
        <h2 className="fw-bold align-items-center">Jahangirnagar University</h2>
        <h1>Savar,Dhaka </h1>
        {/* <h2 className='right'>Date:31/12/2019</h2> */}
      
        <br />
        <span className='right'>Date:</span>
        <h1 className='align-items-center'>Examination Schedule <br />
        <span className='align-items-center'>For</span></h1>
        <a href="">2nd year 2nd semester BSC(honors) Final Exam 2019</a>
        <br />
          </div>
      <label htmlFor="course">Course:</label>
      <select id="course" value={selectedCourse} onChange={handleChange}>
        <option value="">Select a course</option>
        { Array.isArray(courseOptions) &&courseOptions ?.map(course => (
          <option key={course.id} value={course.id}>{course.name}</option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
          <th className='fw-bold'><h1>Date</h1></th>
                <th className='fw-bold'><h1>Course No</h1></th>
                <th className='fw-bold'><h1>Course Name</h1></th>
                <th className='fw-bold'><h1>Time</h1></th>
          </tr>
        </thead>
        <tbody>
          { Array.isArray(courseData) &&courseData ?.map(course => (
            <tr key={course.id}>
              <td> <select id="course" value={selectedCourse} onChange={handleChange}>
        <option value="">Select a course</option>
        { Array.isArray(courseOptions) &&courseOptions ?.map(course => (
          <option key={course.id} value={course.id}>{course.name}</option>
        ))}
      </select>
              </td>
              <td>{course.date}</td>
              <td>{course.code}</td>
              <td>{course.invigilator}</td>
              <td>{course.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DropdownTable;
