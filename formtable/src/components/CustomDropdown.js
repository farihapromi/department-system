import { useState, useEffect } from 'react';
import axios from 'axios';

function CourseDropdown() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseOptions, setCourseOptions] = useState([]);
  const username = 'fariha';
  const password = '123';
  useEffect(() => {
    axios.get('http://localhost:8000/dropdown/course/',{
        headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`
          }
    })
      .then(response => {
        setCourseOptions(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSelectChange = (event) => {
    setSelectedCourse(event.target.value);
  }

  return (
    <div>
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
            <th>Course Name</th>
            <th>Date</th>
            <th>Course Code</th>
            <th>Invigilator</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          { Array.isArray(courseData) &&courseData ?.map(course => (
            <tr key={course.id}>
              <td>{course.name}</td>
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
export default CourseDropdown;
