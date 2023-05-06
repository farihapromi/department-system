import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExamScheduleTable() {
  const username = 'fariha';
  const password = '123';

  const [examSchedules, setExamSchedules] = useState([]);
  const [courses, setCourses] = useState([]);

  // Fetch exam schedules and courses from API
  useEffect(() => {
    axios.get('http://localhost:8000/dropdown/examschedule/',
    {
      headers: {
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`
        }
  }
    )
      .then(response => setExamSchedules(response.data))
      .catch(error => console.log(error));

    axios.get('http://localhost:8000/dropdown/examschedule/',
    {
      headers: {
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`
        }
  })
      .then(response => setCourses(response.data))
      .catch(error => console.log(error));
  }, []);

  // Handler for course select dropdown
  const handleCourseSelect = (examScheduleId, courseId) => {
    axios.patch(`http://localhost:8000/dropdown/examschedule/${examScheduleId}/`, 
    { course: courseId })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Semester</th>
          <th>Exam Year</th>
          <th>Exam Date</th>
          <th>Course Code</th>
          <th>Course Name</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {examSchedules.map(examSchedule => (
          <tr key={examSchedule.id}>
            <td>{examSchedule.semester_year}</td>
            <td>{examSchedule.semester_semester}</td>
            <td>{examSchedule.exam_year}</td>
            <td>{examSchedule.exam_date}</td>
            <td>
              <select
                value={examSchedule.course}
                onChange={event => handleCourseSelect(examSchedule.id, event.target.value)}
              >
                <option value="">-- Select Course --</option>
                {courses.filter(course => course.semester.id === examSchedule.sem.id).map(course => (
                  <option key={course.id} value={course.id}>{course.course_code}</option>
                ))}
              </select>
            </td>
            <td>{examSchedule.course_name}</td>
            <td>{examSchedule.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default ExamScheduleTable