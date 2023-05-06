import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CourseDropdown() {
  const [courses, setCourses] = useState([]);
  const username = 'fariha';
  const password = '123';
 

  useEffect(() => {
    axios
      .get("http://localhost:8000/dropdown/courses/",
      {
        headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`
          }
    })
      .then(res => {
        setCourses(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <select>
      {courses.map(course => (
        <option key={course.id} value={course.id}>{course.course_name}</option>
      ))}
    </select>
  );
}

export default CourseDropdown;